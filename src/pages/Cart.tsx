
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { state: cartState, updateQuantity, removeItem } = useCart();

  const subtotal = cartState.total;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits divins et ajoutez-les à votre panier.</p>
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
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer mes achats
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartState.items.map((item) => (
              <Card key={item.id} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      {item.chakra && (
                        <Badge variant="secondary" className="mt-1">
                          Chakra {item.chakra}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right min-w-20">
                      <p className="font-semibold text-gray-800">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.price.toFixed(2)}€ l'unité
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-lg border-0 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Récapitulatif</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500">
                      Livraison gratuite dès 50€ d'achat
                    </p>
                  )}
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">{total.toFixed(2)}€</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 mb-4">
                  <Link to="/checkout">
                    Procéder au paiement
                  </Link>
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <p>✨ Paiement 100% sécurisé</p>
                  <p>💫 Satisfaction garantie</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
