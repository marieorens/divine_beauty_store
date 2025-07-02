
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
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

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (orderData: any) => {
      console.log("Creating order with data:", orderData);
      
      try {
        // Create or update customer in customers table
        const customerData = {
          email: orderData.customer.email,
          first_name: orderData.customer.first_name,
          last_name: orderData.customer.last_name,
          phone: orderData.customer.phone || null,
          user_id: user?.id || null,
        };

        console.log("Creating/updating customer:", customerData);

        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .upsert([customerData], { 
            onConflict: 'email',
            ignoreDuplicates: false 
          })
          .select()
          .single();

        if (customerError) {
          console.error("Customer creation error:", customerError);
          throw customerError;
        }

        console.log("Customer created/updated:", customer);

        // Create order
        const orderToCreate = {
          customer_id: customer.id,
          total_amount: orderData.total_amount,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address,
          order_number: `CMD-${Date.now()}`, // Temporary, will be overwritten by trigger
          status: 'pending',
          payment_status: 'pending'
        };

        console.log("Creating order:", orderToCreate);

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert([orderToCreate])
          .select()
          .single();

        if (orderError) {
          console.error("Order creation error:", orderError);
          throw orderError;
        }

        console.log("Order created:", order);

        // Create order items
        const orderItems = orderData.items.map((item: any) => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
        }));

        console.log("Creating order items:", orderItems);

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Order items creation error:", itemsError);
          throw itemsError;
        }

        console.log("Order items created successfully");
        return order;
      } catch (error) {
        console.error("Full order creation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      console.log("Order created successfully - all queries invalidated");
      toast({
        title: "Commande créée",
        description: "La commande a été enregistrée avec succès.",
      });
    },
    onError: (error: any) => {
      console.error("Order creation failed:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la commande: " + error.message,
        variant: "destructive",
      });
    },
  });
};
