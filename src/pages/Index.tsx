
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Sparkles, Shield, Truck, Phone } from "lucide-react";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const getPrimaryImage = (product: any) => {
    if (product.product_images && product.product_images.length > 0) {
      const primaryImage = product.product_images.find((img: any) => img.is_primary);
      return primaryImage?.image_url || product.product_images[0]?.image_url;
    }
    return product.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop";
  };

  const handleAddToWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getPrimaryImage(product),
        chakra: product.chakra
      });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getPrimaryImage(product),
      chakra: product.chakra
    });
  };

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
      title: "Ingrédients Naturels",
      description: "Formules à base d'ingrédients biologiques et naturels"
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
      title: "Testé Dermatologiquement",
      description: "Tous nos produits sont testés par des dermatologues"
    },
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
      title: "Livraison Gratuite",
      description: "Livraison gratuite dès 50€ d'achat"
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />,
      title: "Support Client",
      description: "Service client disponible 7j/7"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section avec fond animé */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <AnimatedBackground />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="shimmer-text">
                Divine Beauty
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Découvrez notre collection exclusive de produits de beauté naturels et luxueux
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Link to="/products">
                  Découvrir la Collection
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6" asChild>
                <Link to="/about">
                  En Savoir Plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Produits Vedettes
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Découvrez nos produits les plus populaires, soigneusement sélectionnés pour vous
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-pink-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Chargement des produits...</p>
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={getPrimaryImage(product)} 
                      alt={product.name}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className={`bg-white/90 hover:bg-white p-2 ${isInWishlist(product.id) ? 'text-pink-500' : ''}`}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                        <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1 fill-current" />
                        Vedette
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{product.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">(0)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl sm:text-2xl font-bold text-pink-600">{product.price}€</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-sm" asChild>
                        <Link to={`/products/${product.id}`}>
                          Voir Détails
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="self-center sm:self-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base sm:text-lg text-gray-600 mb-4">Aucun produit vedette pour le moment.</p>
              <Button asChild variant="outline">
                <Link to="/products">
                  Voir Tous les Produits
                </Link>
              </Button>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                Voir Tous les Produits
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Pourquoi Choisir Divine Beauty ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Nous nous engageons à vous offrir le meilleur de la beauté naturelle et éthique
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-base sm:text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Prête à Révéler Votre Beauté Naturelle ?
          </h2>
          <p className="text-lg sm:text-xl text-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de femmes qui ont déjà transformé leur routine beauté avec nos produits premium
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6" asChild>
              <Link to="/products">
                Commander Maintenant
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6" asChild>
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
