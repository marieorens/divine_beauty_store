
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      // Récupérer les profils utilisateurs avec leurs commandes
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Pour chaque profil, récupérer les commandes liées
      const customersWithOrders = await Promise.all(
        profiles.map(async (profile) => {
          // Récupérer les clients correspondants
          const { data: customer } = await supabase
            .from("customers")
            .select("*")
            .eq("user_id", profile.id)
            .single();
          
          // Récupérer les commandes si le client existe
          let orders = [];
          if (customer) {
            const { data: orderData } = await supabase
              .from("orders")
              .select("id, total_amount, status, created_at")
              .eq("customer_id", customer.id);
            orders = orderData || [];
          }
          
          return {
            id: profile.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: customer?.email || "Non renseigné",
            phone: profile.phone,
            created_at: profile.created_at,
            orders: orders,
            orders_count: orders.length,
            total_spent: orders.reduce((sum, order) => sum + (order.total_amount || 0), 0),
            status: orders.length > 0 ? 'active' : 'inactive'
          };
        })
      );
      
      return customersWithOrders;
    },
  });
};

export const useAdminCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ["admin-customer", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID is required");
      
      // Récupérer le profil
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", customerId)
        .single();
      
      if (profileError) throw profileError;
      
      // Récupérer le client correspondant
      const { data: customer } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", profile.id)
        .single();
      
      // Récupérer les commandes avec leurs items si le client existe
      let orders = [];
      if (customer) {
        const { data: orderData } = await supabase
          .from("orders")
          .select(`
            *,
            order_items(
              *,
              product:products(*)
            )
          `)
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false });
        orders = orderData || [];
      }
      
      return {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: customer?.email || "Non renseigné",
        phone: profile.phone,
        created_at: profile.created_at,
        orders: orders
      };
    },
    enabled: !!customerId,
  });
};
