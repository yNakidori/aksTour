import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { auth } from '../../firebase/firbase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getCustomer } from '../../services/customerService';
import CustomerAuth from '../CustomerAuth';

const StoreAuthButton = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Buscar dados completos do cliente
        const result = await getCustomer(currentUser.uid);
        if (result.success) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            ...result.data
          });
        } else {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-green-50 px-3 md:px-4 py-2 rounded-full">
            <User size={18} className="text-green-600" />
            <span className="text-xs md:text-sm font-semibold text-gray-700 max-w-[100px] md:max-w-none truncate">
              {user.name || user.displayName || user.email.split('@')[0]}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
            title="Sair"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm font-semibold">Sair</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-colors text-sm md:text-base"
        >
          <User size={18} />
          <span>Entrar</span>
        </button>
      )}

      {/* Modal de Login/Cadastro */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
            >
              <span className="text-2xl text-gray-600">×</span>
            </button>
            <CustomerAuth 
              onAuthSuccess={handleAuthSuccess} 
              isCheckout={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoreAuthButton;
