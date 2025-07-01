
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminAuth = localStorage.getItem("adminAuth");
      setIsAdmin(adminAuth === "true");
      setLoading(false);
    };

    checkAdminAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-auth" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
