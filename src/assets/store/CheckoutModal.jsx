import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import CustomerAuth from '../CustomerAuth';

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal, 
  stripePromise,
  onSuccess 
}) => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  if (!isOpen) return null;

  const handleAuthSuccess = (userData) => {
    setCustomerInfo(userData);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    // Aqui você pode salvar o pedido no Firebase
    console.log('Pagamento bem-sucedido:', paymentIntent);
    onSuccess();
  };

  const handleBack = () => {
    setShowPayment(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold text-center mb-6">
            Finalizar Compra
          </h2>

          {/* Resumo do Pedido */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-semibold">
                    R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Formulário de Autenticação ou Pagamento */}
          {!showPayment ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Identifique-se</h3>
              <CustomerAuth onAuthSuccess={handleAuthSuccess} isCheckout={true} />
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                cart={cart}
                total={cartTotal}
                customerInfo={customerInfo}
                onSuccess={handlePaymentSuccess}
                onBack={handleBack}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
