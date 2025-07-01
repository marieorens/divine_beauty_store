
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, XCircle, Package, Loader2 } from "lucide-react";
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
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case "shipped":
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Package className="w-3 h-3 mr-1" />Expédiée</Badge>;
      case "delivered":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Livrée</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Annulée</Badge>;
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Détails de la commande
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-400">
            Erreur lors du chargement des détails: {error.message}
          </div>
        )}

        {orderDetails && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{orderDetails.order.order_number}</h2>
                <p className="text-gray-400">Passée le {formatDate(orderDetails.order.created_at)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(orderDetails.order.status)}
                <p className="text-2xl font-bold text-white">{Number(orderDetails.order.total_amount).toFixed(2)}€</p>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Informations client</h3>
              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                <p><strong>Nom:</strong> {orderDetails.customer.first_name} {orderDetails.customer.last_name}</p>
                <p><strong>Email:</strong> {orderDetails.customer.email}</p>
                {orderDetails.customer.phone && (
                  <p><strong>Téléphone:</strong> {orderDetails.customer.phone}</p>
                )}
              </div>
            </div>

            {/* Addresses */}
            {(orderDetails.order.shipping_address || orderDetails.order.billing_address) && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Adresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orderDetails.order.shipping_address && (
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Adresse de livraison</h4>
                      <p className="text-gray-300 whitespace-pre-line">{orderDetails.order.shipping_address}</p>
                    </div>
                  )}
                  {orderDetails.order.billing_address && (
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Adresse de facturation</h4>
                      <p className="text-gray-300 whitespace-pre-line">{orderDetails.order.billing_address}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Articles commandés</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0">
                        {item.products?.image_url && (
                          <img 
                            src={item.products.image_url} 
                            alt={item.products.name || 'Produit'} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white">{item.products?.name || 'Produit inconnu'}</h4>
                        <p className="text-gray-400 text-sm">{item.products?.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-300">Quantité: {item.quantity}</span>
                          <span className="text-gray-300">Prix unitaire: {Number(item.unit_price).toFixed(2)}€</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{Number(item.total_price).toFixed(2)}€</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Statut du paiement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <p><strong>Statut:</strong> {orderDetails.order.payment_status || 'En attente'}</p>
                {orderDetails.order.stripe_session_id && (
                  <p><strong>ID Stripe:</strong> {orderDetails.order.stripe_session_id}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminOrderDetailsModal;
