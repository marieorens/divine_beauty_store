
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Wishlist from "@/pages/Wishlist";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import SizeGuide from "@/pages/SizeGuide";
import OrderSuccess from "@/pages/OrderSuccess";
import OrderTracking from "@/pages/OrderTracking";
import Auth from "@/pages/Auth";
import Account from "@/pages/Account";
import OrderDetail from "@/pages/OrderDetail";
import AdminAuth from "@/pages/AdminAuth";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminCustomers from "@/pages/AdminCustomers";
import NotFound from "@/pages/NotFound";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-white">
                <Routes>
                  {/* Routes publiques avec navigation normale */}
                  <Route path="/" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Index />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/products" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Products />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/product/:id" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <ProductDetail />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/cart" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Cart />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/checkout" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Checkout />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/wishlist" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Wishlist />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/about" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <About />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/contact" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Contact />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/faq" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <FAQ />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/shipping" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <Shipping />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/size-guide" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <SizeGuide />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/order-success" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <OrderSuccess />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="/order-tracking" element={
                    <>
                      <Navigation />
                      <main className="flex-1">
                        <PageTransition>
                          <OrderTracking />
                        </PageTransition>
                      </main>
                      <Footer />
                    </>
                  } />
                  
                  {/* Routes d'authentification */}
                  <Route 
                    path="/auth" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <PageTransition>
                          <Auth />
                        </PageTransition>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/account" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navigation />
                          <main className="flex-1">
                            <PageTransition>
                              <Account />
                            </PageTransition>
                          </main>
                          <Footer />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/order/:id" 
                    element={
                      <ProtectedRoute>
                        <>
                          <Navigation />
                          <main className="flex-1">
                            <PageTransition>
                              <OrderDetail />
                            </PageTransition>
                          </main>
                          <Footer />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Routes admin */}
                  <Route path="/admin-auth" element={<AdminAuth />} />
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/products" element={
                    <AdminProtectedRoute>
                      <AdminProducts />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminProtectedRoute>
                      <AdminOrders />
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/customers" element={
                    <AdminProtectedRoute>
                      <AdminCustomers />
                    </AdminProtectedRoute>
                  } />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
