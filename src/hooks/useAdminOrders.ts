
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
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

      if (ordersError) throw ordersError;

      // Get customers data for customer names and emails
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("id, email, first_name, last_name, user_id");

      if (customersError) throw customersError;

      // Get profiles data for additional customer info
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name");

      if (profilesError) throw profilesError;

      // Get order items count for each order
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("order_id, quantity");

      if (itemsError) throw itemsError;

      // Combine the data
      const ordersWithDetails = orders.map(order => {
        const customer = customers.find(c => c.id === order.customer_id);
        const profile = profiles.find(p => p.id === customer?.user_id);
        const items = orderItems.filter(item => item.order_id === order.id);
        const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

        return {
          ...order,
          customer_name: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A' : 'N/A',
          customer_email: customer?.email || 'N/A',
          items_count: itemsCount,
          total: Number(order.total_amount)
        };
      });

      return ordersWithDetails;
    },
  });
};
