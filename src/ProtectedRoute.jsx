import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "./firebase/firbase";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    // Salva a rota para redirecionar após login
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
