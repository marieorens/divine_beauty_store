
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      console.log("Fetching admin customers...");
      
      // Get all customers from the customers table
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select(`
          id,
          email,
          first_name,
          last_name,
          phone,
          created_at,
          updated_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (customersError) {
        console.error("Error fetching customers:", customersError);
        throw customersError;
      }

      console.log("Customers found:", customers);

      // Get orders data for each customer
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          customer_id,
          total_amount,
          status
        `);

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        throw ordersError;
      }

      console.log("Orders found:", orders);

      // Combine the data
      const customersWithStats = customers.map(customer => {
        // Find orders for this customer
        const customerOrders = orders.filter(order => order.customer_id === customer.id);

        const totalSpent = customerOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
        const ordersCount = customerOrders.length;
        const status = ordersCount > 0 ? 'active' : 'inactive';

        return {
          id: customer.id,
          first_name: customer.first_name || 'Non renseigné',
          last_name: customer.last_name || 'Non renseigné',
          email: customer.email || 'N/A',
          phone: customer.phone || 'Non renseigné',
          created_at: customer.created_at,
          updated_at: customer.updated_at,
          orders_count: ordersCount,
          total_spent: totalSpent,
          status
        };
      });

      console.log("Final customers with stats:", customersWithStats);
      return customersWithStats;
    },
  });
};
