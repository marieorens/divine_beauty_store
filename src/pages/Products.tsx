
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Star, Heart, Search } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Gloss Mystique Rose",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg",
      rating: 5,
      category: "gloss",
      description: "Un éclat divin pour sublimer votre beauté intérieure",
      inStock: true
    },
    {
      id: 2,
      name: "Gloss Lumière Dorée",
      price: 26.99,
      originalPrice: 32.99,
      image: "/placeholder.svg",
      rating: 5,
      category: "gloss",
      description: "Révélez votre aura dorée avec cette teinte magique",
      inStock: true
    },
    {
      id: 3,
      name: "Rouge à Lèvres Passion",
      price: 28.99,
      originalPrice: 34.99,
      image: "/placeholder.svg",
      rating: 4,
      category: "rouge",
      description: "L'expression pure de votre flamme intérieure",
      inStock: false
    },
    {
      id: 4,
      name: "Baume Sérénité",
      price: 19.99,
      originalPrice: 24.99,
      image: "/placeholder.svg",
      rating: 5,
      category: "baume",
      description: "Nourrissez vos lèvres avec la paix divine",
      inStock: true
    },
    {
      id: 5,
      name: "Gloss Essence Corail",
      price: 22.99,
      originalPrice: 27.99,
      image: "/placeholder.svg",
      rating: 4,
      category: "gloss",
      description: "L'harmonie parfaite entre nature et beauté",
      inStock: true
    },
    {
      id: 6,
      name: "Rouge Chakra Bordeaux",
      price: 31.99,
      originalPrice: 37.99,
      image: "/placeholder.svg",
      rating: 5,
      category: "rouge",
      description: "Ancrez votre pouvoir avec cette teinte terre",
      inStock: true
    }
  ];

  const categories = [
    { id: "all", name: "Tous les produits" },
    { id: "gloss", name: "Gloss" },
    { id: "rouge", name: "Rouge à lèvres" },
    { id: "baume", name: "Baumes" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Notre Collection Divine
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos créations cosmétiques inspirées par la spiritualité, 
            conçues pour révéler votre beauté intérieure
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500" 
                  : "border-pink-300 text-pink-600 hover:bg-pink-50"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button size="sm" variant="secondary" className="rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Rupture de stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-xs line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-pink-600">
                        {product.price}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice}€
                        </span>
                      )}
                    </div>
                    <Button 
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-xs"
                      disabled={!product.inStock}
                    >
                      <Link to={`/product/${product.id}`}>
                        {product.inStock ? "Voir" : "Épuisé"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
