
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Star, Heart, Search } from "lucide-react";
import { useAllActiveProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: products, isLoading } = useAllActiveProducts();
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

  // Obtenir les catégories uniques des produits
  const categories = [
    { id: "all", name: "Tous les produits" },
    ...Array.from(new Set(products?.map(p => p.category).filter(Boolean))).map(cat => ({
      id: cat,
      name: cat
    }))
  ];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Notre Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous nos produits cosmétiques inspirés par la spiritualité, 
            conçus pour révéler votre beauté intérieure
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={getPrimaryImage(product)} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className={`rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isInWishlist(product.id) ? 'text-pink-500' : ''
                        }`}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    {/* Badge produit vedette */}
                    {product.is_featured && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Vedette
                        </div>
                      </div>
                    )}
                    {product.stock === 0 && (
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
                          className="w-3 h-3 text-yellow-400 fill-current" 
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">(0)</span>
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
                      </div>
                      <Button 
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-xs"
                        disabled={product.stock === 0}
                      >
                        <Link to={`/product/${product.id}`}>
                          {product.stock > 0 ? "Voir" : "Épuisé"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {products?.length === 0 
                ? "Aucun produit disponible pour le moment." 
                : "Aucun produit trouvé pour votre recherche."
              }
            </p>
            {products?.length === 0 && (
              <p className="text-gray-400 text-sm">
                Veuillez ajouter des produits depuis l'administration.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
