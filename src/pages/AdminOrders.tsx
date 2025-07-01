
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Package, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";
import AdminOrderDetailsModal from "@/components/AdminOrderDetailsModal";
import { useAdminOrders } from "@/hooks/useAdminOrders";

const AdminOrders = () => {
  const { data: orders = [], isLoading, error } = useAdminOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center text-red-400">
            Erreur lors du chargement des commandes: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 lg:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4 text-gray-300 hover:text-white">
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gestion des Commandes</h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{order.order_number}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-gray-300 space-y-1 text-sm">
                      <p><strong>Client:</strong> <span className="truncate">{order.customer_name}</span></p>
                      <p><strong>Email:</strong> <span className="truncate">{order.customer_email}</span></p>
                      <p><strong>Articles:</strong> {order.items_count} produit(s)</p>
                      <p><strong>Date:</strong> {formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold text-white">{order.total.toFixed(2)}€</p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-gray-300 border-gray-600 hover:bg-gray-700 w-full sm:w-auto"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Voir détails</span>
                      <span className="sm:hidden">Détails</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 sm:p-12 text-center">
              <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucune commande</h3>
              <p className="text-gray-400">Les commandes apparaîtront ici une fois que les clients auront effectué des achats.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AdminOrderDetailsModal 
        orderId={selectedOrderId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default AdminOrders;
