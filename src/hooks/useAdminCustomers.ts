
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      // Get profiles data with order counts and total spent
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          phone,
          created_at,
          updated_at
        `);

      if (profilesError) throw profilesError;

      // Get customers data to get email addresses
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("user_id, email");

      if (customersError) throw customersError;

      // Get orders data for each customer
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("customer_id, total_amount, status");

      if (ordersError) throw ordersError;

      // Combine the data
      const customersWithStats = profiles.map(profile => {
        const customer = customers.find(c => c.user_id === profile.id);
        const customerOrders = orders.filter(o => {
          const customerRecord = customers.find(c => c.user_id === profile.id);
          return customerRecord && o.customer_id === customerRecord.user_id;
        });

        const totalSpent = customerOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
        const ordersCount = customerOrders.length;
        const status = ordersCount > 0 ? 'active' : 'inactive';

        return {
          id: profile.id,
          first_name: profile.first_name || 'N/A',
          last_name: profile.last_name || 'N/A',
          email: customer?.email || 'N/A',
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
