
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Package, Heart, Settings, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useUserOrders } from "@/hooks/useUserOrders";
import { useWishlist } from "@/hooks/useWishlist";

const Account = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: orders, isLoading: ordersLoading } = useUserOrders();
  const { state: wishlistState } = useWishlist();
  const updateProfile = useUpdateProfile();

  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Connexion requise
            </h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder à votre compte.
            </p>
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Link to="/auth">Se connecter</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mon Compte
          </h1>
          <p className="text-gray-600">
            Bienvenue {profile?.first_name || user.email}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favoris
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email || ""}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-pink-500 to-purple-500"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Enregistrement..." : "Sauvegarder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Mes Commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement...</p>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">Commande #{order.order_number}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                              {order.status === 'pending' && 'En attente'}
                              {order.status === 'processing' && 'En traitement'}
                              {order.status === 'shipped' && 'Expédiée'}
                              {order.status === 'delivered' && 'Livrée'}
                            </Badge>
                            <p className="text-lg font-bold text-pink-600 mt-1">
                              {order.total_amount}€
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            {order.order_items?.length} article(s)
                          </p>
                          <Button variant="outline" size="sm" asChild className="w-full bg-gradient-to-r from-white-500 to-orange-500">
                            <Link to={`/order/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune commande pour le moment</p>
                    <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
                      <Link to="/products">Découvrir nos produits</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Ma Liste de Souhaits</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistState.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistState.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-pink-600 font-bold mb-3">{item.price}€</p>
                        <Button size="sm" className="w-full bg-gradient-to-r from-pink-500 to-purple-500" asChild>
                          <Link to={`/product/${item.id}`}>Voir le produit</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Votre liste de souhaits est vide</p>
                    <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
                      <Link to="/products">Découvrir nos produits</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Email de contact</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Mot de passe</h3>
                    <p className="text-sm text-gray-600">••••••••</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Changer
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    onClick={signOut}
                    className="w-full"
                  >
                    Se déconnecter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
