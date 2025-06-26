
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Heart, Sparkles } from "lucide-react";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Gloss Mystique Rose",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg",
      rating: 5,
      description: "Un éclat divin pour sublimer votre beauté intérieure"
    },
    {
      id: 2,
      name: "Gloss Lumière Dorée",
      price: 26.99,
      originalPrice: 32.99,
      image: "/placeholder.svg",
      rating: 5,
      description: "Révélez votre aura dorée avec cette teinte magique"
    },
    {
      id: 3,
      name: "Gloss Essence Corail",
      price: 22.99,
      originalPrice: 27.99,
      image: "/placeholder.svg",
      rating: 4,
      description: "L'harmonie parfaite entre nature et beauté"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-50 to-rose-100">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Sparkles className="w-16 h-16 text-pink-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Divine Beauty
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light">
            "Votre beauté est le reflet de votre âme lumineuse"
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de cosmétiques inspirés par la spiritualité, 
            conçus pour révéler votre éclat naturel et nourrir votre essence divine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
            >
              <Link to="/products">Découvrir la Collection</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg"
            >
              <Link to="/about">Notre Histoire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Coups de Cœur
            </h2>
            <p className="text-lg text-gray-600">
              Une sélection de nos produits les plus appréciés
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      -17%
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">(127)</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-pink-600">
                          {product.price}€
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          {product.originalPrice}€
                        </span>
                      </div>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      >
                        <Link to={`/product/${product.id}`}>Voir le produit</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <Link to="/products">Voir tous les produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nos Valeurs Spirituelles
            </h2>
            <p className="text-lg text-gray-600">
              Chaque produit est créé avec amour et intention
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Amour de Soi</h3>
              <p className="text-gray-600">
                Nos produits vous encouragent à célébrer votre beauté unique et à cultiver l'amour-propre.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Énergie Positive</h3>
              <p className="text-gray-600">
                Chaque formule est infusée d'intentions positives pour rayonner de l'intérieur.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticité</h3>
              <p className="text-gray-600">
                Des ingrédients naturels et purs pour révéler votre véritable essence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Rejoignez Notre Communauté Divine
          </h2>
          <p className="text-xl mb-8">
            Recevez nos conseils beauté spirituels et nos offres exclusives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800"
            />
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
