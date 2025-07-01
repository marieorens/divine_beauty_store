
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Mail, Phone, Calendar, ShoppingBag, Package } from "lucide-react";
import { useAdminCustomer } from "@/hooks/useAdminCustomers";
import AdminNavigation from "@/components/AdminNavigation";

const AdminCustomerDetail = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { data: customer, isLoading, error } = useAdminCustomer(customerId || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Chargement du profil client...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Client introuvable</h2>
            <Button asChild>
              <Link to="/admin/customers">Retour aux clients</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalSpent = customer.orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
  const ordersCount = customer.orders?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4 text-gray-300 hover:text-white">
              <Link to="/admin/customers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux clients
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {customer.first_name} {customer.last_name}
              </h1>
              <p className="text-gray-400">Client depuis le {formatDate(customer.created_at)}</p>
            </div>
          </div>
          
          <Badge className={ordersCount > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {ordersCount > 0 ? "Actif" : "Inactif"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations client */}
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Prénom</p>
                  <p className="text-white font-medium">{customer.first_name || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nom</p>
                  <p className="text-white font-medium">{customer.last_name || "Non renseigné"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {customer.email}
                </p>
              </div>
              
              {customer.phone && (
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="text-white font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {customer.phone}
                  </p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-400">Date d'inscription</p>
                <p className="text-white font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(customer.created_at)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{ordersCount}</div>
                <p className="text-gray-400 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Commandes
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{totalSpent.toFixed(2)}€</div>
                <p className="text-gray-400">Total dépensé</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {ordersCount > 0 ? (totalSpent / ordersCount).toFixed(2) : 0}€
                </div>
                <p className="text-gray-400">Panier moyen</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des commandes */}
        <Card className="bg-gray-800 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Historique des commandes ({ordersCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ordersCount === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Aucune commande pour ce client</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customer.orders?.map((order: any) => (
                  <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-white font-medium">{order.order_number}</h4>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {formatDate(order.created_at)} • {order.order_items?.length || 0} article(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-bold">{order.total_amount.toFixed(2)}€</p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="text-gray-300 border-gray-600 hover:bg-gray-600">
                        <Link to={`/admin/orders/${order.id}`}>
                          Voir détails
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCustomerDetail;
