
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";

const AdminOrders = () => {
  // Mock data - remplacez par de vraies données
  const orders = [
    {
      id: 1,
      order_number: "CMD-000001",
      customer_name: "Marie Dubois",
      customer_email: "marie@example.com",
      total: 89.99,
      status: "pending",
      created_at: "2024-01-15T10:30:00Z",
      items_count: 3
    },
    {
      id: 2,
      order_number: "CMD-000002",
      customer_name: "Sophie Martin",
      customer_email: "sophie@example.com",
      total: 156.50,
      status: "shipped",
      created_at: "2024-01-14T14:20:00Z",
      items_count: 5
    },
    {
      id: 3,
      order_number: "CMD-000003",
      customer_name: "Julie Leroy",
      customer_email: "julie@example.com",
      total: 245.00,
      status: "delivered",
      created_at: "2024-01-13T09:15:00Z",
      items_count: 7
    }
  ];

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
                Retour au tableau de bord
              </Link>
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestion des Commandes</h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{order.order_number}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-gray-300 space-y-1">
                      <p><strong>Client:</strong> {order.customer_name}</p>
                      <p><strong>Email:</strong> {order.customer_email}</p>
                      <p><strong>Articles:</strong> {order.items_count} produit(s)</p>
                      <p><strong>Date:</strong> {formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{order.total.toFixed(2)}€</p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucune commande</h3>
              <p className="text-gray-400">Les commandes apparaîtront ici une fois que les clients auront effectué des achats.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
