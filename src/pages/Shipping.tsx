
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, RotateCcw, Shield, Clock } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Livraison & Retours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir sur nos options de livraison et notre politique de retour.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Options de Livraison</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <Package className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Livraison Standard</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Badge className="bg-green-100 text-green-800">Gratuite dès 50€</Badge>
                <p className="text-gray-600">2-3 jours ouvrés</p>
                <p className="text-2xl font-bold text-gray-800">4,99€</p>
                <p className="text-sm text-gray-500">Via Colissimo</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Livraison Express</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Badge className="bg-orange-100 text-orange-800">24h</Badge>
                <p className="text-gray-600">Avant 13h le lendemain</p>
                <p className="text-2xl font-bold text-gray-800">9,99€</p>
                <p className="text-sm text-gray-500">Commande avant 14h</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <Package className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Point Relais</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Badge className="bg-blue-100 text-blue-800">Économique</Badge>
                <p className="text-gray-600">3-5 jours ouvrés</p>
                <p className="text-2xl font-bold text-gray-800">3,99€</p>
                <p className="text-sm text-gray-500">Plus de 6000 points</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* International Shipping */}
        <Card className="shadow-lg border-0 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Truck className="w-8 h-8 text-purple-500 mr-3" />
              Livraison Internationale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Europe</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Délai : 5-7 jours ouvrés</li>
                  <li>• Tarif : 12,99€</li>
                  <li>• Suivi inclus</li>
                  <li>• Taxes et douanes incluses</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Monde entier</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Délai : 7-14 jours ouvrés</li>
                  <li>• Tarif : 19,99€</li>
                  <li>• Suivi inclus</li>
                  <li>• Frais douaniers à la charge du client</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Policy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Politique de Retour</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <RotateCcw className="w-8 h-8 text-pink-500 mr-3" />
                  Conditions de Retour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">30 jours</h4>
                    <p className="text-gray-600 text-sm">pour changer d'avis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">État neuf</h4>
                    <p className="text-gray-600 text-sm">emballage d'origine non ouvert</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Hygiène</h4>
                    <p className="text-gray-600 text-sm">produits cosmétiques non testés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Comment procéder ?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Contactez-nous</h4>
                      <p className="text-gray-600 text-sm">Par email ou téléphone</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Recevez l'étiquette</h4>
                      <p className="text-gray-600 text-sm">Étiquette de retour gratuite</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Expédiez</h4>
                      <p className="text-gray-600 text-sm">Déposez le colis au point relais</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Remboursement</h4>
                      <p className="text-gray-600 text-sm">Sous 5-7 jours ouvrés</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tracking */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Suivi de Commande</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Dès l'expédition de votre commande, vous recevrez un email avec votre numéro de suivi.
              Vous pouvez suivre votre colis en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors"
              >
                Suivre ma commande
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contacter le support
              </a>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Shipping;
