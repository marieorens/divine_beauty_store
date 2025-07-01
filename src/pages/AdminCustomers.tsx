
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mail, Calendar, ShoppingBag } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";

const AdminCustomers = () => {
  // Mock data - remplacez par de vraies données
  const customers = [
    {
      id: 1,
      first_name: "Marie",
      last_name: "Dubois",
      email: "marie@example.com",
      created_at: "2024-01-10T10:30:00Z",
      orders_count: 3,
      total_spent: 245.50,
      status: "active"
    },
    {
      id: 2,
      first_name: "Sophie",
      last_name: "Martin",
      email: "sophie@example.com",
      created_at: "2024-01-08T14:20:00Z",
      orders_count: 7,
      total_spent: 892.30,
      status: "active"
    },
    {
      id: 3,
      first_name: "Julie",
      last_name: "Leroy",
      email: "julie@example.com",
      created_at: "2024-01-05T09:15:00Z",
      orders_count: 2,
      total_spent: 156.75,
      status: "active"
    },
    {
      id: 4,
      first_name: "Emma",
      last_name: "Rousseau",
      email: "emma@example.com",
      created_at: "2023-12-20T16:45:00Z",
      orders_count: 1,
      total_spent: 67.90,
      status: "inactive"
    }
  ];

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
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestion des Clients</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Clients</p>
                  <p className="text-2xl font-bold text-white">{customers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Clients Actifs</p>
                  <p className="text-2xl font-bold text-white">{customers.filter(c => c.status === 'active').length}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actifs</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Commandes Totales</p>
                  <p className="text-2xl font-bold text-white">{customers.reduce((sum, c) => sum + c.orders_count, 0)}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">CA Total</p>
                  <p className="text-2xl font-bold text-white">{customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}€</p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {customer.first_name} {customer.last_name}
                    </h3>
                    <p className="text-gray-400 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2" />
                      {customer.email}
                    </p>
                  </div>
                  {getStatusBadge(customer.status)}
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
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
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
