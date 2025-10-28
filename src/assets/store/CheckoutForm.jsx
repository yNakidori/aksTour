import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { saveOrder } from '../../services/customerService';

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const CheckoutForm = ({ cart, total, customerInfo, onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Chamar a API serverless da Vercel para criar o PaymentIntent
      const response = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total, 
          cart: cart,
          customerInfo: customerInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirmar o pagamento com o Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customerInfo.name || customerInfo.displayName,
            email: customerInfo.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Salvar pedido no Firestore
          const orderData = {
            paymentIntentId: result.paymentIntent.id,
            amount: total,
            items: cart.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              description: item.description
            })),
            customerInfo: {
              name: customerInfo.name || customerInfo.displayName,
              email: customerInfo.email,
              phone: customerInfo.phone,
              cpf: customerInfo.cpf,
              address: customerInfo.address
            },
            paymentMethod: 'card',
            paymentStatus: 'paid'
          };

          // Salvar no Firebase
          await saveOrder(customerInfo.uid, orderData);

          setLoading(false);
          onSuccess(result.paymentIntent);
        }
      }

    } catch (err) {
      console.error('Erro no pagamento:', err);
      setError('Erro ao processar pagamento. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Informações de Pagamento</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Voltar
          </button>
        )}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processando...' : `Pagar R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Pagamento seguro processado pelo Stripe. Seus dados estão protegidos.
      </p>
    </form>
  );
};

export default CheckoutForm;
