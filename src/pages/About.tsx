
import { Heart, Sparkles, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Notre Histoire
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Divine Beauty est née d'une vision : créer des cosmétiques qui révèlent la beauté intérieure 
            de chaque femme, en harmonie avec son essence spirituelle.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Nous croyons que la beauté véritable émane de l'intérieur. Chaque produit Divine Beauty 
              est formulé avec des ingrédients naturels soigneusement sélectionnés et infusé d'intentions 
              positives pour sublimer votre éclat naturel.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre approche holistique de la beauté unit le soin physique et l'épanouissement spirituel, 
              créant une expérience transformatrice à chaque utilisation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Beauté Consciente</h3>
              <p className="text-gray-600">
                Des cosmétiques créés avec amour et intention pour révéler votre lumière intérieure.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Authenticité</h3>
                <p className="text-gray-600">
                  Des formules pures et naturelles, sans compromis sur la qualité.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  La recherche constante de la perfection dans chaque détail.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Bienveillance</h3>
                <p className="text-gray-600">
                  Une communauté unie par l'amour de la beauté authentique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Fondatrice</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              "J'ai créé Divine Beauty après avoir découvert le pouvoir transformateur des rituels de beauté conscients. 
              Chaque produit est le fruit d'une recherche approfondie alliant cosmétologie moderne et sagesse ancestrale."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              "Notre vision est de vous accompagner dans votre voyage vers l'épanouissement, 
              en révélant la déesse qui sommeille en vous."
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Marie Lumière</p>
                <p className="text-gray-600">Fondatrice & Créatrice</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
