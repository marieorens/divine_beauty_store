
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Eye, Palette, Info } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Guide des Tailles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trouvez la taille parfaite pour chaque produit Divine Beauty et découvrez nos conseils d'application.
          </p>
        </div>

        {/* Lipstick Guide */}
        <Card className="shadow-lg border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Palette className="w-8 h-8 text-pink-500 mr-3" />
              Rouges à Lèvres & Gloss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Formats Disponibles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">Format Classique</h4>
                      <p className="text-gray-600 text-sm">3.5g - Usage quotidien</p>
                    </div>
                    <Badge className="bg-pink-100 text-pink-800">Standard</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">Format Mini</h4>
                      <p className="text-gray-600 text-sm">1.5g - Idéal voyage</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Mini</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">Format XL</h4>
                      <p className="text-gray-600 text-sm">5g - Usage intensif</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">XL</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Durée d'Utilisation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Format Mini (1.5g)</span>
                    <span className="font-semibold">1-2 mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Format Classique (3.5g)</span>
                    <span className="font-semibold">3-4 mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Format XL (5g)</span>
                    <span className="font-semibold">5-6 mois</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <Info className="w-4 h-4 inline mr-1" />
                      Basé sur une utilisation quotidienne normale
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Guide */}
        <Card className="shadow-lg border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Eye className="w-8 h-8 text-purple-500 mr-3" />
              Guide des Couleurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-gray-800 mb-2">Teints Clairs</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Privilégiez les roses tendres, coraux doux et nudes rosés
                </p>
                <div className="space-y-1">
                  <Badge variant="outline">Rose Mystique</Badge>
                  <Badge variant="outline">Corail Doux</Badge>
                  <Badge variant="outline">Nude Rosé</Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-gray-800 mb-2">Teints Médiums</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Optez pour les oranges, roses vifs et rouges chaleureux
                </p>
                <div className="space-y-1">
                  <Badge variant="outline">Orange Solaire</Badge>
                  <Badge variant="outline">Rose Passion</Badge>
                  <Badge variant="outline">Rouge Feu</Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-gray-800 mb-2">Teints Foncés</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Misez sur les rouges profonds, bordeaux et prunes
                </p>
                <div className="space-y-1">
                  <Badge variant="outline">Rouge Chakra</Badge>
                  <Badge variant="outline">Bordeaux Mystique</Badge>
                  <Badge variant="outline">Prune Royale</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Guide */}
        <Card className="shadow-lg border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Ruler className="w-8 h-8 text-green-500 mr-3" />
              Conseils d'Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Rouge à Lèvres</h3>
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Préparation</h4>
                      <p className="text-gray-600 text-sm">Exfoliez et hydratez vos lèvres</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Application</h4>
                      <p className="text-gray-600 text-sm">Partez du centre vers les coins</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Finition</h4>
                      <p className="text-gray-600 text-sm">Tamponnez avec un mouchoir et repassez</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Gloss</h3>
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Base</h4>
                      <p className="text-gray-600 text-sm">Appliquez sur lèvres nues ou sur rouge</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Quantité</h4>
                      <p className="text-gray-600 text-sm">Une fine couche suffit pour l'éclat</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Retouches</h4>
                      <p className="text-gray-600 text-sm">Renouvelez toutes les 2-3 heures</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Besoin de conseils personnalisés ?
          </h3>
          <p className="text-gray-600 mb-6">
            Notre équipe d'expertes beauté est à votre disposition pour vous conseiller.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors"
            >
              Conseil personnalisé
            </a>
            <a 
              href="mailto:conseils@divinebeauty.fr" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email expert
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SizeGuide;
