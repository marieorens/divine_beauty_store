
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      toast({
        title: "Connexion admin réussie",
        description: "Bienvenue dans l'interface de gestion de votre boutique.",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Erreur d'authentification",
        description: "Mot de passe administrateur incorrect.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-gray-700 bg-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Accès Administrateur
          </CardTitle>
          <p className="text-gray-400">
            Entrez le mot de passe administrateur
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="password"
                placeholder="Mot de passe administrateur"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              disabled={loading}
            >
              {loading ? "Vérification..." : "Accéder au Back-Office"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Accès réservé aux administrateurs autorisés.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
