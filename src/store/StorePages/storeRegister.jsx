import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  CreditCard,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import { auth } from '../../firebase/firbase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { saveCustomer } from '../../services/customerService';

const StoreRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cpf: '',
    address: {
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const handleChange = (e) => {
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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Preencha todos os campos obrigatórios');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Atualizar perfil com nome
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Salvar dados adicionais no Firestore
      const customerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        address: formData.address,
        accountType: 'store_customer',
        createdAt: new Date().toISOString()
      };

      const result = await saveCustomer(userCredential.user.uid, customerData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/store');
        }, 2000);
      } else {
        setError(result.error || 'Erro ao salvar dados do cliente');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está cadastrado');
      } else if (error.code === 'auth/weak-password') {
        setError('Senha muito fraca');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro realizado!</h2>
          <p className="text-gray-600 mb-4">Redirecionando para a loja...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>

      {/* Lado Esquerdo - Formulário */}
      <div className='bg-white py-12 px-6 flex justify-center items-start'>
        <div className='w-full max-w-2xl'>

         {/* DADOS PESSOAIS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Nome completo" />
            <input type="date" className="input" placeholder="Data de nascimento" />
            <input className="input" placeholder="CPF" />
            <input className="input" placeholder="RG / Documento" />
            <input className="input" placeholder="Telefone" />
            <input className="input" placeholder="Email" />
            <input className="input md:col-span-2" placeholder="Endereço completo" />
          </div>
        </section>



        </div>
      </div>

      {/* Lado Direito - Banner */}
      <div className='bg-gradient-to-br from-blue-600 to-blue-800 text-white flex flex-col justify-center items-center p-8 lg:p-12'>
        <div className='max-w-md text-center space-y-6'>
          <h2 className='text-4xl font-bold'>Bem-vindo!</h2>
          <p className='text-lg text-blue-100'>
            Junte-se a milhares de viajantes que confiam em nós para realizar seus sonhos de viagem.
          </p>
          <div className='grid grid-cols-3 gap-4 mt-8'>
            <div className='text-center'>
              <div className='text-3xl font-bold'>100+</div>
              <div className='text-sm text-blue-200'>Destinos</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold'>50k+</div>
              <div className='text-sm text-blue-200'>Clientes</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold'>4.9</div>
              <div className='text-sm text-blue-200'>Avaliação</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default StoreRegister;