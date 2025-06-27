
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Sparkles, Shield, Truck, Phone } from "lucide-react";

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Sérum Éclat Divin",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 124,
      discount: 25
    },
    {
      id: 2,
      name: "Crème Anti-Âge Premium",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      discount: 19
    },
    {
      id: 3,
      name: "Masque Hydratant Luxe",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      discount: 25
    }
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Ingrédients Naturels",
      description: "Formules à base d'ingrédients biologiques et naturels"
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-500" />,
      title: "Testé Dermatologiquement",
      description: "Tous nos produits sont testés par des dermatologues"
    },
    {
      icon: <Truck className="w-6 h-6 text-pink-500" />,
      title: "Livraison Gratuite",
      description: "Livraison gratuite dès 50€ d'achat"
    },
    {
      icon: <Phone className="w-6 h-6 text-pink-500" />,
      title: "Support Client",
      description: "Service client disponible 7j/7"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,182,193,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(221,160,221,0.3),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Divine Beauty
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez notre collection exclusive de produits de beauté naturels et luxueux
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-lg px-8 py-6">
                <Link to="/products">
                  Découvrir la Collection
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/about">
                  En Savoir Plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Produits Vedettes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos produits les plus populaires, soigneusement sélectionnés pour vous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-pink-600">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" asChild>
                      <Link to={`/product/${product.id}`}>
                        Voir Détails
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                Voir Tous les Produits
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Divine Beauty ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir le meilleur de la beauté naturelle et éthique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prête à Révéler Votre Beauté Naturelle ?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de femmes qui ont déjà transformé leur routine beauté avec nos produits premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/products">
                Commander Maintenant
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-pink-600" asChild>
              <Link to="/contact">
                Nous Contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
