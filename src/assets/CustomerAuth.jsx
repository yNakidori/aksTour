import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, MapPin, CreditCard } from 'lucide-react';
import { auth, db } from '../firebase/firbase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

// Nome da collection separada para clientes da loja
const STORE_CUSTOMERS_COLLECTION = 'store_customers';

const CustomerAuth = ({ onAuthSuccess, isCheckout = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    }
  });

  // Verificar se usuário já está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Buscar dados completos do Firestore na collection de clientes da loja
        const userDoc = await getDoc(doc(db, STORE_CUSTOMERS_COLLECTION, currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          ...userData
        });

        if (onAuthSuccess) {
          onAuthSuccess({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            ...userData
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [onAuthSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatZipCode = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleZipCodeChange = (e) => {
    const formatted = formatZipCode(e.target.value);
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, zipCode: formatted }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Buscar dados do Firestore na collection de clientes da loja
        const userDoc = await getDoc(doc(db, STORE_CUSTOMERS_COLLECTION, userCredential.user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        if (onAuthSuccess) {
          onAuthSuccess({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            ...userData
          });
        }
      } else {
        // Cadastro
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Atualizar perfil
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });

        // Salvar dados completos no Firestore na collection separada
        const customerData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          cpf: formData.cpf,
          address: formData.address,
          accountType: 'store_customer', // Identificador do tipo de conta
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          orders: [], // Array para histórico de pedidos
          stripeCustomerId: null, // Para integração com Stripe
        };

        await setDoc(doc(db, STORE_CUSTOMERS_COLLECTION, userCredential.user.uid), customerData);

        if (onAuthSuccess) {
          onAuthSuccess({
            uid: userCredential.user.uid,
            email: formData.email,
            displayName: formData.name,
            phone: formData.phone,
            cpf: formData.cpf,
            address: formData.address,
          });
        }
      }
    } catch (err) {
      console.error('Erro na autenticação:', err);
      
      const errorMessages = {
        'auth/email-already-in-use': 'Este email já está cadastrado',
        'auth/invalid-email': 'Email inválido',
        'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
      };

      setError(errorMessages[err.code] || 'Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  // Se já estiver logado e for checkout, mostra resumo
  if (user && isCheckout) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <User size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user.displayName || user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.phone && <p className="text-sm text-gray-600">{user.phone}</p>}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Se já estiver logado (não checkout), mostra perfil completo
  if (user && !isCheckout) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <User size={24} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-semibold">{user.displayName || user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail size={24} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone size={24} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
            </div>
          )}

          {user.cpf && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <CreditCard size={24} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">CPF</p>
                <p className="font-semibold">{user.cpf}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin size={24} className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-semibold">
                  {user.address.street}, {user.address.number}
                  {user.address.complement && ` - ${user.address.complement}`}
                </p>
                <p className="text-sm text-gray-600">
                  {user.address.neighborhood} - {user.address.city}/{user.address.state}
                </p>
                <p className="text-sm text-gray-600">CEP: {user.address.zipCode}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    );
  }

  // Formulário de Login/Cadastro
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Entrar' : 'Criar Conta'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="João Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                required={!isLogin}
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                required={!isLogin}
                maxLength={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Senha
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
          {!isLogin && (
            <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
          )}
        </div>

        {!isLogin && (
          <>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Endereço</h3>
              
              <div className="space-y-3">
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="CEP"
                  maxLength={9}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    placeholder="Rua"
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="text"
                    name="address.number"
                    value={formData.address.number}
                    onChange={handleInputChange}
                    placeholder="Nº"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <input
                  type="text"
                  name="address.complement"
                  value={formData.address.complement}
                  onChange={handleInputChange}
                  placeholder="Complemento (opcional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />

                <input
                  type="text"
                  name="address.neighborhood"
                  value={formData.address.neighborhood}
                  onChange={handleInputChange}
                  placeholder="Bairro"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="Cidade"
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="UF"
                    maxLength={2}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm uppercase"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
        </button>
      </div>

      {isCheckout && (
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossos Termos de Uso
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerAuth;
