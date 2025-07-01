
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mail, Calendar, ShoppingBag, Eye } from "lucide-react";
import { useAdminCustomers } from "@/hooks/useAdminCustomers";
import AdminNavigation from "@/components/AdminNavigation";

const AdminCustomers = () => {
  const { data: customers, isLoading } = useAdminCustomers();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>;
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
            <p className="mt-4 text-gray-300">Chargement des clients...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCustomers = customers?.filter(c => c.status === 'active') || [];
  const totalOrders = customers?.reduce((sum, c) => sum + c.orders_count, 0) || 0;
  const totalRevenue = customers?.reduce((sum, c) => sum + c.total_spent, 0) || 0;

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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gestion des Clients</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-400">Total Clients</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{customers?.length || 0}</p>
                </div>
                <Users className="w-6 lg:w-8 h-6 lg:h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-400">Clients Actifs</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{activeCustomers.length}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actifs</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-400">Commandes</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{totalOrders}</p>
                </div>
                <ShoppingBag className="w-6 lg:w-8 h-6 lg:h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-400">CA Total</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{totalRevenue.toFixed(2)}€</p>
                </div>
                <div className="text-xl lg:text-2xl">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {customers?.map((customer) => (
            <Card key={customer.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base lg:text-lg font-semibold text-white truncate">
                      {customer.first_name} {customer.last_name}
                    </h3>
                    <p className="text-gray-400 flex items-center mt-1 text-sm lg:text-base truncate">
                      <Mail className="w-3 lg:w-4 h-3 lg:h-4 mr-2 flex-shrink-0" />
                      {customer.email}
                    </p>
                  </div>
                  {getStatusBadge(customer.status)}
                </div>
                
                <div className="space-y-2 text-sm lg:text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Inscription:</span>
                    <span className="text-white flex items-center">
                      <Calendar className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                      {formatDate(customer.created_at)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Commandes:</span>
                    <span className="text-white flex items-center">
                      <ShoppingBag className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                      {customer.orders_count}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total dépensé:</span>
                    <span className="text-white font-semibold">
                      {customer.total_spent.toFixed(2)}€
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    <Link to={`/admin/customers/${customer.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le profil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!customers || customers.length === 0) && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 lg:p-12 text-center">
              <Users className="w-12 lg:w-16 h-12 lg:h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Aucun client</h3>
              <p className="text-sm lg:text-base text-gray-400">Les clients apparaîtront ici une fois qu'ils se seront inscrits.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;
