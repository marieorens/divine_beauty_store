
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      // Get profiles data with email
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          phone,
          email,
          created_at,
          updated_at
        `);

      if (profilesError) throw profilesError;

      // Get orders data for each customer
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          customer_id,
          total_amount,
          status,
          customers!inner(user_id)
        `);

      if (ordersError) throw ordersError;

      // Combine the data
      const customersWithStats = profiles.map(profile => {
        // Find orders for this user
        const userOrders = orders.filter(order => {
          return order.customers?.user_id === profile.id;
        });

        const totalSpent = userOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
        const ordersCount = userOrders.length;
        const status = ordersCount > 0 ? 'active' : 'inactive';

        return {
          id: profile.id,
          first_name: profile.first_name || 'N/A',
          last_name: profile.last_name || 'N/A',
          email: profile.email || 'N/A',
          phone: profile.phone,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          orders_count: ordersCount,
          total_spent: totalSpent,
          status
        };
      });

      return customersWithStats;
    },
  });
};
