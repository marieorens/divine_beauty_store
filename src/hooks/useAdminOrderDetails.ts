
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["admin-order-details", orderId],
    queryFn: async () => {
      // Get order details
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      // Get customer details
      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .select("*")
        .eq("id", order.customer_id)
        .single();

      if (customerError) throw customerError;

      // Get profile details
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", customer.user_id)
        .single();

      if (profileError) throw profileError;

      // Get order items with product details
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select(`
          *,
          products (
            name,
            image_url,
            description
          )
        `)
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      return {
        order,
        customer: {
          ...customer,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone
        },
        items: orderItems
      };
    },
    enabled: !!orderId,
  });
};
