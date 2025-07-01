
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, Mail, Phone, MapPin } from "lucide-react";
import { useAdminOrder } from "@/hooks/useAdminOrders";
import AdminNavigation from "@/components/AdminNavigation";

const AdminOrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error } = useAdminOrder(orderId || "");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case "shipped":
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />Expédiée</Badge>;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Chargement de la commande...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Commande introuvable</h2>
            <Button asChild>
              <Link to="/admin/orders">Retour aux commandes</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4 text-gray-300 hover:text-white">
              <Link to="/admin/orders">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux commandes
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{order.order_number}</h1>
              <p className="text-gray-400">Commande du {formatDate(order.created_at)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {getStatusBadge(order.status)}
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{order.total_amount.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations client */}
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Nom complet</p>
                  <p className="text-white font-medium">
                    {order.customer?.first_name} {order.customer?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{order.customer?.email}</p>
                </div>
              </div>
              
              {order.customer?.phone && (
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="text-white font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {order.customer.phone}
                  </p>
                </div>
              )}
              
              {order.shipping_address && (
                <div>
                  <p className="text-sm text-gray-400">Adresse de livraison</p>
                  <p className="text-white font-medium flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-line">{order.shipping_address}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Résumé de la commande */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Statut</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Articles</span>
                <span className="text-white">{order.order_items?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paiement</span>
                <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                  {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                </Badge>
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">{order.total_amount.toFixed(2)}€</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles commandés */}
        <Card className="bg-gray-800 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Articles commandés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={item.product?.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop"} 
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.product?.name}</h4>
                      <p className="text-gray-400 text-sm">Prix unitaire: {item.unit_price}€</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-gray-400 text-sm">Quantité</p>
                      <p className="text-white font-medium">×{item.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total</p>
                      <p className="text-white font-bold">{item.total_price}€</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
