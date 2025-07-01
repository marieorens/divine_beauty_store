
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import AdminNavigation from "@/components/AdminNavigation";

const AdminOrders = () => {
  const { data: orders, isLoading } = useAdminOrders();

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
            <p className="mt-4 text-gray-300">Chargement des commandes...</p>
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
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Retour au tableau de bord</span>
                <span className="sm:hidden">Retour</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gestion des Commandes</h1>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white">{orders?.length || 0}</div>
                <p className="text-xs lg:text-sm text-gray-400">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-yellow-400">
                  {orders?.filter(o => o.status === 'pending').length || 0}
                </div>
                <p className="text-xs lg:text-sm text-gray-400">En attente</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-400">
                  {orders?.filter(o => o.status === 'shipped').length || 0}
                </div>
                <p className="text-xs lg:text-sm text-gray-400">Expédiées</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-green-400">
                  {orders?.filter(o => o.status === 'delivered').length || 0}
                </div>
                <p className="text-xs lg:text-sm text-gray-400">Livrées</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders?.map((order) => (
            <Card key={order.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 lg:gap-4 mb-2 flex-wrap">
                      <h3 className="text-base lg:text-lg font-semibold text-white truncate">
                        {order.order_number}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm lg:text-base text-gray-300 space-y-1">
                      <p><strong>Client:</strong> {order.customer?.first_name} {order.customer?.last_name}</p>
                      <p className="truncate"><strong>Email:</strong> {order.customer?.email}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p><strong>Articles:</strong> {order.order_items?.length || 0} produit(s)</p>
                        <p><strong>Date:</strong> {formatDate(order.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
                    <div className="text-left sm:text-right">
                      <p className="text-xl lg:text-2xl font-bold text-white">
                        {order.total_amount.toFixed(2)}€
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400">
                        {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="text-gray-300 border-gray-600 hover:bg-gray-700 w-full sm:w-auto"
                    >
                      <Link to={`/admin/orders/${order.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Voir détails</span>
                        <span className="sm:hidden">Détails</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!orders || orders.length === 0) && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 lg:p-12 text-center">
              <Package className="w-12 lg:w-16 h-12 lg:h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Aucune commande</h3>
              <p className="text-sm lg:text-base text-gray-400">Les commandes apparaîtront ici une fois que les clients auront effectué des achats.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
