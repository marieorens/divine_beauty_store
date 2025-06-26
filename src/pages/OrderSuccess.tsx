
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Mail, Home } from "lucide-react";

const OrderSuccess = () => {
  const orderNumber = "CMD-000001"; // In real app, this would come from URL params

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Commande confirmée !</h1>
          <p className="text-xl text-gray-600">Merci pour votre achat chez Divine Beauty</p>
        </div>

        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Détails de votre commande</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold text-pink-600">82.97€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <span className="font-semibold text-green-600">Confirmée</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Prochaines étapes</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-pink-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Confirmation par email</p>
                      <p className="text-sm text-gray-600">Un récapitulatif détaillé vous a été envoyé</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-pink-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Préparation de commande</p>
                      <p className="text-sm text-gray-600">Votre commande sera préparée sous 24h</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Expédition</p>
                      <p className="text-sm text-gray-600">Livraison sous 2-3 jours ouvrés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Suivre ma commande</h3>
              <p className="text-gray-600 mb-4">Restez informé de l'état de votre livraison</p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/order-tracking">
                  Suivre ma commande
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600 mb-4">Notre équipe est là pour vous accompagner</p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            🌟 Merci de faire confiance à Divine Beauty pour sublimer votre beauté naturelle
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Link to="/products">
                Continuer mes achats
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
