
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mail, Calendar, ShoppingBag, Phone, Loader2 } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";
import { useAdminCustomers } from "@/hooks/useAdminCustomers";

const AdminCustomers = () => {
  const { data: customers = [], isLoading, error } = useAdminCustomers();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
            Erreur lors du chargement des clients: {error.message}
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Gestion des Clients</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Clients</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{customers.length}</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Clients Actifs</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{customers.filter(c => c.status === 'active').length}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actifs</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Commandes Totales</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{customers.reduce((sum, c) => sum + c.orders_count, 0)}</p>
                </div>
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">CA Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}€</p>
                </div>
                <div className="text-xl sm:text-2xl">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {customer.first_name} {customer.last_name}
                    </h3>
                    <p className="text-gray-400 flex items-center mt-1 text-sm">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </p>
                    {customer.phone && (
                      <p className="text-gray-400 flex items-center mt-1 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        {customer.phone}
                      </p>
                    )}
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {getStatusBadge(customer.status)}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Inscription:</span>
                    <span className="text-white flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(customer.created_at)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Commandes:</span>
                    <span className="text-white flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-1" />
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
                  <Button variant="outline" size="sm" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700">
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {customers.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucun client</h3>
              <p className="text-gray-400">Les clients apparaîtront ici une fois qu'ils se seront inscrits.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;
