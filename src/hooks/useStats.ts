
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // Get total revenue
      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount")
        .eq("payment_status", "paid");

      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      // Get total orders count
      const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      // Get total products count
      const { count: totalProducts } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Get total customers count
      const { count: totalCustomers } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      return {
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
      };
    },
  });
};
