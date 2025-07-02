
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      console.log("Fetching admin orders...");
      
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          order_number,
          total_amount,
          status,
          payment_status,
          created_at,
          updated_at,
          customer_id,
          shipping_address,
          billing_address
        `)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        throw ordersError;
      }

      console.log("Orders found:", orders);

      // Get customers data
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("id, email, first_name, last_name");

      if (customersError) {
        console.error("Error fetching customers:", customersError);
        throw customersError;
      }

      console.log("Customers found:", customers);

      // Get order items count for each order
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("order_id, quantity");

      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        throw itemsError;
      }

      console.log("Order items found:", orderItems);

      // Combine the data
      const ordersWithDetails = orders.map(order => {
        const customer = customers.find(c => c.id === order.customer_id);
        const items = orderItems.filter(item => item.order_id === order.id);
        const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

        return {
          ...order,
          customer_name: customer ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A' : 'N/A',
          customer_email: customer?.email || 'N/A',
          items_count: itemsCount,
          total: Number(order.total_amount)
        };
      });

      console.log("Final orders with details:", ordersWithDetails);
      return ordersWithDetails;
    },
  });
};
