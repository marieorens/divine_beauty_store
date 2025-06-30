
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Search, Menu, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state: cartState } = useCart();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Produits", path: "/products" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Divine Beauty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                  isActive(item.path) ? 'text-pink-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/wishlist">
                <Heart className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4" />
                {cartState.items.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-pink-500 text-xs">
                    {cartState.items.length}
                  </Badge>
                )}
              </Link>
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/account">
                    <User className="w-4 h-4 mr-1" />
                    Mon compte
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
                <Link to="/auth">Connexion</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-medium transition-colors hover:text-pink-600 ${
                        isActive(item.path) ? 'text-pink-600' : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="space-y-4 pt-6 border-t">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Favoris
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start relative" asChild>
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Panier
                      {cartState.items.length > 0 && (
                        <Badge className="ml-auto bg-pink-500">
                          {cartState.items.length}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  {user ? (
                    <>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/account" onClick={() => setIsOpen(false)}>
                          <User className="w-4 h-4 mr-2" />
                          Mon compte
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={signOut}>
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        Connexion
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
