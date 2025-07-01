
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          customer:customers(*),
          order_items(
            *,
            product:products(*)
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("Order ID is required");
      
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          customer:customers(*),
          order_items(
            *,
            product:products(*)
          )
        `)
        .eq("id", orderId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};
