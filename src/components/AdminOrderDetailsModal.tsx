
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Package, User, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { useAdminOrderDetails } from "@/hooks/useAdminOrderDetails";

interface AdminOrderDetailsModalProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminOrderDetailsModal = ({ orderId, open, onOpenChange }: AdminOrderDetailsModalProps) => {
  const { data: orderDetails, isLoading, error } = useAdminOrderDetails(orderId || "");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "shipped":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Expédiée</Badge>;
      case "delivered":
        return <Badge variant="default" className="bg-green-100 text-green-800">Livrée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!orderId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Détails de la commande
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-4">
            Erreur lors du chargement des détails de la commande
          </div>
        )}

        {orderDetails && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{orderDetails.order.order_number}</h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(orderDetails.order.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    {getStatusBadge(orderDetails.order.status)}
                    <p className="text-xl font-bold">{Number(orderDetails.order.total_amount).toFixed(2)}€</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Informations client
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">
                      {orderDetails.customer.first_name} {orderDetails.customer.last_name}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-1" />
                      {orderDetails.customer.email}
                    </p>
                    {orderDetails.customer.phone && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Phone className="w-4 h-4 mr-1" />
                        {orderDetails.customer.phone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {orderDetails.order.shipping_address && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Adresse de livraison
                  </h4>
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {orderDetails.order.shipping_address}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Articles commandés</h4>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        {item.products?.image_url && (
                          <img 
                            src={item.products.image_url} 
                            alt={item.products?.name || 'Produit'}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h5 className="font-medium">{item.products?.name || 'Produit supprimé'}</h5>
                          <p className="text-sm text-gray-600">
                            Quantité: {item.quantity} × {Number(item.unit_price).toFixed(2)}€
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{Number(item.total_price).toFixed(2)}€</p>
                        </div>
                      </div>
                      {index < orderDetails.items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>{Number(orderDetails.order.total_amount).toFixed(2)}€</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminOrderDetailsModal;
