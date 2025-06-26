
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nous livrons en 2-3 jours ouvrés en France métropolitaine via Colissimo. Pour les livraisons express (24h), un supplément de 5€ s'applique. Les commandes passées avant 14h sont expédiées le jour même."
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 30 jours pour changer d'avis. Les produits doivent être dans leur emballage d'origine, non ouverts et non utilisés. Les frais de retour sont à votre charge sauf en cas de défaut."
    },
    {
      question: "Vos produits sont-ils naturels ?",
      answer: "Tous nos cosmétiques sont formulés avec 100% d'ingrédients naturels et biologiques. Nous n'utilisons ni parabènes, ni sulfates, ni produits chimiques agressifs. Chaque formule est enrichie d'huiles essentielles et d'extraits de plantes."
    },
    {
      question: "Comment connaître mon chakra dominant ?",
      answer: "Notre quiz spirituel gratuit vous aide à identifier votre chakra dominant. Vous pouvez aussi consulter notre guide des chakras ou nous contacter pour un conseil personnalisé."
    },
    {
      question: "Les produits conviennent-ils aux peaux sensibles ?",
      answer: "Oui, nos formules douces conviennent à tous types de peaux, y compris les plus sensibles. Nous recommandons toujours de faire un test sur une petite zone avant la première utilisation."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés par cryptage SSL."
    },
    {
      question: "Livrez-vous à l'international ?",
      answer: "Oui, nous livrons dans toute l'Europe (5-7 jours ouvrés) et dans le monde entier (7-14 jours ouvrés). Les frais de livraison varient selon la destination."
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Dès l'expédition, vous recevez un email avec votre numéro de suivi. Vous pouvez suivre votre colis en temps réel sur notre site ou directement sur le site du transporteur."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à vos questions sur nos produits, 
            la livraison et nos services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors"
            >
              Nous contacter
            </a>
            <a 
              href="mailto:contact@divinebeauty.fr" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email direct
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
