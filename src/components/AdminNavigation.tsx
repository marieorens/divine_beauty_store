
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, Menu, Home, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { name: "Tableau de bord", path: "/admin", icon: Home },
    { name: "Produits", path: "/admin/products", icon: Package },
    { name: "Commandes", path: "/admin/orders", icon: ShoppingCart },
    { name: "Clients", path: "/admin/customers", icon: Users }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Déconnexion admin",
      description: "Vous avez été déconnecté du back-office.",
    });
    navigate("/admin-auth");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Admin */}
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-red-400 ${
                    isActive(item.path) ? 'text-red-400' : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank" className="text-gray-300 border-gray-600 hover:bg-gray-800">
                Voir le site
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gray-900 border-gray-800">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 text-lg font-medium transition-colors hover:text-red-400 ${
                          isActive(item.path) ? 'text-red-400' : 'text-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="space-y-4 pt-6 border-t border-gray-800">
                  <Button variant="outline" className="w-full justify-start text-gray-300 border-gray-600" asChild>
                    <Link to="/" target="_blank" onClick={() => setIsOpen(false)}>
                      <Home className="w-4 h-4 mr-2" />
                      Voir le site
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start bg-red-600 hover:bg-red-700" 
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
