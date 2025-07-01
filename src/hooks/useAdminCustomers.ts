
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          orders(id, total_amount, status, created_at)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Calculer les statistiques pour chaque client
      return data.map(customer => ({
        ...customer,
        orders_count: customer.orders?.length || 0,
        total_spent: customer.orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0,
        status: customer.orders && customer.orders.length > 0 ? 'active' : 'inactive'
      }));
    },
  });
};

export const useAdminCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ["admin-customer", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID is required");
      
      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          orders(
            *,
            order_items(
              *,
              product:products(*)
            )
          )
        `)
        .eq("id", customerId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!customerId,
  });
};
