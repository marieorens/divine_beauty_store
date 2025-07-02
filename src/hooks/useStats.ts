
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      console.log("Fetching admin stats...");
      
      // Get all orders (same query as useAdminOrders)
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("total_amount, status, payment_status");

      if (ordersError) {
        console.error("Error fetching orders for stats:", ordersError);
        throw ordersError;
      }

      console.log("Orders for stats:", orders);

      // Calculate total revenue from all orders (same logic as AdminOrders)
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

      console.log("Stats calculated:", {
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
      });

      return {
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
      };
    },
  });
};
