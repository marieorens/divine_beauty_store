import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  // Mock product data - dans une vraie app, vous récupéreriez les données via l'ID
  const product = {
    id: parseInt(id || "1"),
    name: "Gloss Mystique Rose",
    price: 24.99,
    originalPrice: 29.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 5,
    reviewCount: 127,
    description: "Un éclat divin pour sublimer votre beauté intérieure. Ce gloss rose mystique capture l'essence de la féminité divine et révèle votre aura naturelle.",
    ingredients: [
      "Huile de jojoba bio",
      "Beurre de karité équitable",
      "Vitamine E naturelle",
      "Essence de rose de Damas",
      "Cristaux de quartz rose énergisés"
    ],
    benefits: {
      physical: [
        "Hydratation longue durée",
        "Brillance naturelle",
        "Texture non collante",
        "Tenue 6 heures"
      ],
      spiritual: [
        "Élève l'énergie du chakra du cœur",
        "Favorise l'expression de l'amour de soi",
        "Amplifie la confiance intérieure",
        "Harmonise les énergies féminines"
      ]
    },
    inStock: true,
    stockCount: 15
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      chakra: product.chakra
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0],
        chakra: product.chakra
      });
    }
  };

  const isInWishlistCheck = isInWishlist(product.id.toString());

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
                src={product.images[selectedImage]} 
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
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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
                      className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviewCount} avis)</span>
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800">En stock ({product.stockCount})</Badge>
                ) : (
                  <Badge variant="destructive">Rupture de stock</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-pink-600">{product.price}€</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{product.originalPrice}€</span>
              )}
              <Badge className="bg-pink-100 text-pink-800">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

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
                disabled={!product.inStock}
              >
                Ajouter au panier - {(product.price * quantity).toFixed(2)}€
              </Button>
            </div>

            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Ingrédients Naturels</h3>
                <ul className="space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700 flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-pink-600">Bienfaits Physiques</h3>
                  <ul className="space-y-2">
                    {product.benefits.physical.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <Star className="w-3 h-3 text-pink-500 mr-2 fill-current" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">Bienfaits Spirituels</h3>
                  <ul className="space-y-2">
                    {product.benefits.spiritual.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <Star className="w-3 h-3 text-purple-500 mr-2 fill-current" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
