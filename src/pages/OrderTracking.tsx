
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const handleSearch = () => {
    // Simulation d'une recherche
    if (trackingNumber.trim()) {
      setOrderData({
        orderNumber: "CMD-001",
        trackingNumber: trackingNumber,
        status: "En transit",
        estimatedDelivery: "Demain avant 18h",
        currentLocation: "Centre de tri Paris",
        steps: [
          { status: "Commande confirmée", date: "15/01/2024 10:30", completed: true },
          { status: "Préparation", date: "15/01/2024 14:20", completed: true },
          { status: "Expédition", date: "16/01/2024 09:15", completed: true },
          { status: "En transit", date: "16/01/2024 15:45", completed: true, current: true },
          { status: "Livraison", date: "En cours...", completed: false }
        ],
        items: [
          { name: "Gloss Mystique Rose", quantity: 1, image: "/placeholder.svg" },
          { name: "Rouge Chakra Bordeaux", quantity: 1, image: "/placeholder.svg" }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Suivi de Commande
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Suivez votre commande en temps réel et connaissez sa position exacte.
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Entrez votre numéro de suivi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Ex: FR123456789"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Search className="w-4 h-4 mr-2" />
                Suivre
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Vous trouverez votre numéro de suivi dans l'email de confirmation d'expédition
            </p>
          </CardContent>
        </Card>

        {/* Order Results */}
        {orderData && (
          <div className="space-y-8">
            
            {/* Order Status */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Commande #{orderData.orderNumber}</CardTitle>
                    <p className="text-gray-600">Numéro de suivi: {orderData.trackingNumber}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{orderData.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <Truck className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Livraison estimée</h3>
                      <p className="text-gray-600">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <Package className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Position actuelle</h3>
                      <p className="text-gray-600">{orderData.currentLocation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Steps */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Historique de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? step.current 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? (
                          step.current ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className={`font-semibold ${
                            step.completed ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </h4>
                          <span className={`text-sm ${
                            step.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.date}
                          </span>
                        </div>
                        {step.current && (
                          <p className="text-sm text-blue-600 mt-1">Étape actuelle</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Produits commandés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Un problème avec votre livraison ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Notre équipe support est là pour vous aider
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <a href="/contact">Contacter le support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+33123456789">Appeler directement</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No search performed yet */}
        {!orderData && (
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Où se trouve votre commande ?
              </h3>
              <p className="text-gray-600 mb-6">
                Entrez votre numéro de suivi pour connaître la position exacte de votre colis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="/contact">Numéro perdu ?</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/account">Mes commandes</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};

export default OrderTracking;
