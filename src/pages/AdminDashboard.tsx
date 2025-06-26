
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Star, 
  TrendingUp, 
  Package, 
  Users, 
  Euro,
  Search,
  Calendar,
  Mail
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalRevenue: 12450.50,
    totalOrders: 89,
    totalProducts: 15,
    totalCustomers: 234
  };

  const recentOrders = [
    {
      id: "CMD-001",
      customer: "Marie Dubois",
      email: "marie@email.com",
      total: 49.98,
      status: "completed",
      date: "2024-01-15",
      products: ["Gloss Mystique Rose", "Baume Sérénité"]
    },
    {
      id: "CMD-002", 
      customer: "Sophie Martin",
      email: "sophie@email.com",
      total: 24.99,
      status: "processing",
      date: "2024-01-15",
      products: ["Gloss Lumière Dorée"]
    },
    {
      id: "CMD-003",
      customer: "Amélie Petit",
      email: "amelie@email.com", 
      total: 76.97,
      status: "shipped",
      date: "2024-01-14",
      products: ["Rouge Chakra Bordeaux", "Gloss Essence Corail", "Baume Sérénité"]
    }
  ];

  const products = [
    {
      id: 1,
      name: "Gloss Mystique Rose",
      stock: 15,
      price: 24.99,
      sales: 45,
      status: "active"
    },
    {
      id: 2,
      name: "Gloss Lumière Dorée", 
      stock: 8,
      price: 26.99,
      sales: 32,
      status: "active"
    },
    {
      id: 3,
      name: "Rouge à Lèvres Passion",
      stock: 0,
      price: 28.99,
      sales: 28,
      status: "out_of_stock"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Livré", variant: "default" as const, className: "bg-green-100 text-green-800" },
      processing: { label: "En cours", variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      shipped: { label: "Expédié", variant: "outline" as const, className: "bg-blue-100 text-blue-800" },
      active: { label: "Actif", variant: "default" as const, className: "bg-green-100 text-green-800" },
      out_of_stock: { label: "Rupture", variant: "destructive" as const, className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const tabs = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "orders", label: "Commandes" },
    { id: "products", label: "Produits" },
    { id: "customers", label: "Clients" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Gérez votre boutique Divine Beauty</p>
        </div>

        {/* Navigation */}
        <div className="mb-8 border-b">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)}€</div>
                  <p className="text-xs text-muted-foreground">+12% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+8% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produits</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">3 en rupture</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+15% ce mois</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{order.customer}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Commande #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{order.total}€</p>
                          <p className="text-sm text-gray-600">{order.products.length} produit(s)</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des commandes</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Rechercher une commande..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filtrer par date
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commande</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Produits</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.products.map((product, index) => (
                              <div key={index} className="truncate max-w-32">{product}</div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{order.total}€</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Voir détails</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des produits</h2>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                Ajouter un produit
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Ventes</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">{product.price}€</TableCell>
                        <TableCell>{product.sales} ventes</TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Modifier</Button>
                            <Button size="sm" variant="outline">Stock</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des clients</h2>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Newsletter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clients totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">234</div>
                  <p className="text-sm text-gray-600">+15% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clients actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">89</div>
                  <p className="text-sm text-gray-600">Commande récente</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <p className="text-sm text-gray-600">Abonnés actifs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
