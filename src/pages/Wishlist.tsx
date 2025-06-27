
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

const Wishlist = () => {
  const { state: wishlistState, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  const moveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      chakra: item.chakra
    });
    removeItem(item.id);
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre liste de souhaits est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits divins et ajoutez vos favoris.</p>
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Link to="/products">
                Découvrir nos produits
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Mes Favoris</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistState.items.map((item) => (
            <Card key={item.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 rounded-full p-2"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                  {item.chakra && (
                    <Badge variant="secondary" className="mb-2">
                      Chakra {item.chakra}
                    </Badge>
                  )}
                  <p className="text-2xl font-bold text-pink-600 mb-4">
                    {item.price.toFixed(2)}€
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                      onClick={() => moveToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/product/${item.id}`}>
                        Voir le produit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
