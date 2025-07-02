
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const TestOrderButton = () => {
  const createOrderMutation = useCreateOrder();
  const { user } = useAuth();

  const handleTestOrder = () => {
    const testOrderData = {
      customer: {
        email: user?.email || "test@example.com",
        first_name: "Test",
        last_name: "User",
      },
      total_amount: 29.99,
      shipping_address: "123 Test Street\n75001 Paris\nFrance",
      billing_address: "123 Test Street\n75001 Paris\nFrance",
      items: [
        {
          product_id: "test-product-id", // You'll need to use a real product ID
          quantity: 1,
          unit_price: 29.99,
          total_price: 29.99,
        }
      ]
    };

    console.log("Creating test order...");
    createOrderMutation.mutate(testOrderData);
  };

  return (
    <Button 
      onClick={handleTestOrder}
      disabled={createOrderMutation.isPending}
      className="bg-red-500 hover:bg-red-600"
    >
      {createOrderMutation.isPending ? "Création..." : "Test Commande"}
    </Button>
  );
};

export default TestOrderButton;
