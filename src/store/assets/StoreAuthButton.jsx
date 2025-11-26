import React, { useState, useEffect } from 'react';
import { User, LogOut, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firbase';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { getCustomer } from '../../services/customerService';

const StoreAuthButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const result = await getCustomer(userCredential.user.uid);
      if (result.success) {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          ...result.data
        });
      }

      setShowAuthModal(false);
      setCredentials({ email: '', password: '' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('Email ou senha incorretos');
      } else if (error.code === 'auth/invalid-credential') {
        setLoginError('Credenciais inválidas');
      } else {
        setLoginError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoginLoading(false);
    }
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

      {/* Modal de Login */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => {
                setShowAuthModal(false);
                setLoginError('');
                setCredentials({ email: '', password: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors"
            >
              <span className="text-3xl">×</span>
            </button>

            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">Bem-vindo de volta!</h2>
              <p className="text-green-100 text-sm">Faça login para continuar</p>
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                    required
                    disabled={loginLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Sua senha"
                    required
                    disabled={loginLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loginLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Ainda não tem uma conta?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/storeregister');
                  }}
                  className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-bold transition-all"
                  disabled={loginLoading}
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreAuthButton;
