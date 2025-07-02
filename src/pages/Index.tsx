
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import AnimatedBackground from "@/components/AnimatedBackground";
import TestOrderButton from "@/components/TestOrderButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Test button - to be removed later */}
          <div className="mb-8">
            <TestOrderButton />
          </div>
          
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Collection Automne 2024
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Divine Beauty
            </span>
            <br />
            <span className="text-gray-800">Révélez votre éclat</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre collection exclusive de cosmétiques inspirés des chakras. 
            Chaque produit est conçu pour révéler votre beauté naturelle et harmoniser votre énergie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              <Link to="/products">
                Découvrir la collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full">
              <Link to="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Pourquoi choisir Divine Beauty ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche unique qui allie beauté et bien-être spirituel
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Formules Naturelles</h3>
              <p className="text-gray-600">
                Nos produits sont formulés avec des ingrédients naturels soigneusement sélectionnés pour respecter votre peau et l'environnement.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Énergie des Chakras</h3>
              <p className="text-gray-600">
                Chaque produit est associé à un chakra spécifique pour harmoniser votre beauté extérieure avec votre énergie intérieure.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Résultats Visibles</h3>
              <p className="text-gray-600">
                Des formules efficaces qui révèlent votre éclat naturel dès les premières applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nos clientes nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez leurs témoignages authentiques
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Prête à révéler votre beauté divine ?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de femmes qui ont déjà transformé leur routine beauté avec nos produits exclusifs.
          </p>
          <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            <Link to="/products">
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
