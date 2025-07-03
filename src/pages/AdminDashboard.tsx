
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/useStats";
import { Package, Users, ShoppingCart, TrendingUp, Eye, Settings } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Chargement du tableau de bord...</p>
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
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Tableau de Bord Administrateur</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Produits</CardTitle>
              <Package className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalProducts || 0}</div>
              <p className="text-xs text-gray-400">Total des produits</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalOrders || 0}</div>
              <p className="text-xs text-gray-400">Commandes totales</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Clients</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalCustomers || 0}</div>
              <p className="text-xs text-gray-400">Clients enregistrés</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Revenus</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalRevenue?.toFixed(2) || 0}€</div>
              <p className="text-xs text-gray-400">Revenus totaux</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-base lg:text-lg text-white">
                <Package className="w-5 h-5 mr-2" />
                Gestion des Produits
              </CardTitle>
              <CardDescription className="text-sm text-gray-400">
                Ajouter, modifier et gérer vos produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Link to="/admin/products">
                  Gérer les produits
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-base lg:text-lg text-white">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Commandes
              </CardTitle>
              <CardDescription className="text-sm text-gray-400">
                Suivre et gérer les commandes clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link to="/admin/orders" className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Voir les commandes
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-base lg:text-lg text-white">
                <Users className="w-5 h-5 mr-2" />
                Clients
              </CardTitle>
              <CardDescription className="text-sm text-gray-400">
                Gérer la base de données clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link to="/admin/customers" className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Gérer les clients
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
