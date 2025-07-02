
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["admin-order-details", orderId],
    queryFn: async () => {
      console.log("Fetching order details for:", orderId);
      
      // Get order details
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) {
        console.error("Error fetching order:", orderError);
        throw orderError;
      }

      console.log("Order found:", order);

      // Get customer details
      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .select("*")
        .eq("id", order.customer_id)
        .single();

      if (customerError) {
        console.error("Error fetching customer:", customerError);
        throw customerError;
      }

      console.log("Customer found:", customer);

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

      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        throw itemsError;
      }

      console.log("Order items found:", orderItems);

      return {
        order,
        customer: {
          ...customer,
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone
        },
        items: orderItems
      };
    },
    enabled: !!orderId,
  });
};
