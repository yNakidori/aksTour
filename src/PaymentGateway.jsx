import React, { useState, useEffect } from 'react';
import { testConnection, createPaymentIntent } from './api/backend';
import Swal from 'sweetalert2';

const PaymentGateway = ({ amount = 5000, currency = 'brl', onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Testar conexão com backend ao carregar
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await testConnection();
      console.log('Backend conectado:', response);
      setBackendStatus('connected');
    } catch (error) {
      console.error('Backend não conectado:', error);
      setBackendStatus('disconnected');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    if (backendStatus !== 'connected') {
      Swal.fire({
        icon: 'error',
        title: 'Backend Desconectado',
        text: 'O servidor de pagamento não está disponível. Tente novamente.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Dados do pagamento para enviar ao backend
      const paymentRequest = {
        amount,
        currency,
        customer: {
          name: paymentData.name
        },
        metadata: {
          integration: 'aks-tour'
        }
      };

      console.log('Enviando dados para backend:', paymentRequest);

      // Criar intenção de pagamento
      const response = await createPaymentIntent(paymentRequest);
      
      console.log('Resposta do backend:', response);

      if (response.clientSecret) {
        // Simular processamento do pagamento
        // Em uma implementação real, você usaria o Stripe.js aqui
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        Swal.fire({
          icon: 'success',
          title: 'Pagamento Realizado!',
          text: `Pagamento de R$ ${(amount / 100).toFixed(2)} processado com sucesso!`,
          confirmButtonText: 'Ok'
        });

        if (onSuccess) {
          onSuccess({
            paymentIntentId: response.id,
            amount,
            currency
          });
        }
      }

    } catch (error) {
      console.error('Erro no pagamento:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Erro no Pagamento',
        text: 'Não foi possível processar o pagamento. Tente novamente.',
      });

      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return (amount / 100).toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Pagamento Seguro</h2>
      
      {/* Status do Backend */}
      <div className="mb-4 p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status do Servidor:</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            backendStatus === 'connected' 
              ? 'bg-green-100 text-green-800'
              : backendStatus === 'disconnected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {backendStatus === 'connected' ? '✅ Conectado' : 
             backendStatus === 'disconnected' ? '❌ Desconectado' : 
             '🔄 Verificando...'}
          </span>
        </div>
      </div>

      {/* Valor do Pagamento */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <span className="text-lg font-medium text-gray-600">Total a Pagar:</span>
          <div className="text-3xl font-bold text-blue-600">
            R$ {formatAmount(amount)}
          </div>
        </div>
      </div>

      {/* Formulário de Pagamento */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome no Cartão
          </label>
          <input
            type="text"
            name="name"
            value={paymentData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="João Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número do Cartão
          </label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validade
            </label>
            <input
              type="text"
              name="expiry"
              value={paymentData.expiry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12/28"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
            />
          </div>
        </div>
      </div>

      {/* Botão de Pagamento */}
      <button
        onClick={handlePayment}
        disabled={isLoading || backendStatus !== 'connected'}
        className={`w-full mt-6 py-3 px-4 rounded-md font-medium transition-colors ${
          isLoading || backendStatus !== 'connected'
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processando...
          </div>
        ) : (
          `Pagar R$ ${formatAmount(amount)}`
        )}
      </button>

      {/* Botão para Reconectar */}
      {backendStatus === 'disconnected' && (
        <button
          onClick={checkBackendConnection}
          className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          🔄 Tentar Reconectar
        </button>
      )}

      {/* Informações de Segurança */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        🔒 Pagamento seguro processado via Stripe
      </div>
    </div>
  );
};

export default PaymentGateway;