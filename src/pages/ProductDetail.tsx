
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useProducts } from "@/hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { data: products, isLoading } = useProducts();
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  // Trouver le produit par son ID
  const product = products?.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du produit...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
            <Button asChild>
              <Link to="/products">Retour aux produits</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Obtenir les images du produit
  const getProductImages = () => {
    if (product.product_images && product.product_images.length > 0) {
      return product.product_images
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => img.image_url);
    }
    
    // Fallback vers l'image principale ou une image par défaut
    const fallbackImage = product.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop";
    return [fallbackImage];
  };

  const images = getProductImages();
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: images[0],
        chakra: product.chakra
      });
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: images[0],
        chakra: product.chakra
      });
    }
  };

  const isInWishlistCheck = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-pink-600 hover:text-pink-700">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <Button 
                size="sm" 
                variant={isInWishlistCheck ? "default" : "secondary"}
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 rounded-full p-2 ${
                  isInWishlistCheck ? 'bg-pink-500 hover:bg-pink-600' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${isInWishlistCheck ? 'fill-current text-white' : ''}`} />
              </Button>
              {product.is_featured && (
                <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Vedette
                </Badge>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current" 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">(0 avis)</span>
                </div>
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-800">En stock ({product.stock})</Badge>
                ) : (
                  <Badge variant="destructive">Rupture de stock</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-pink-600">{product.price}€</span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description || "Un produit exceptionnel pour révéler votre beauté naturelle."}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Quantité:</label>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 flex-1 max-w-xs"
                disabled={product.stock === 0}
              >
                Ajouter au panier - {(product.price * quantity).toFixed(2)}€
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Détails du Produit</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Catégorie:</span>
                    <span className="font-medium">{product.category || "Beauté"}</span>
                  </div>
                  {product.chakra && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chakra:</span>
                      <span className="font-medium">{product.chakra}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{product.stock} disponible(s)</span>
                  </div>
                  {product.is_featured && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Produit vedette
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
