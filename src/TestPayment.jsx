import React from 'react';
import PaymentGateway from './PaymentGateway';

const TestPayment = () => {
  const handlePaymentSuccess = (result) => {
    console.log('Pagamento realizado com sucesso:', result);
  };

  const handlePaymentError = (error) => {
    console.error('Erro no pagamento:', error);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Teste de Pagamento</h1>
        
        <div className="mb-8 text-center">
          <p className="text-gray-600 mb-4">
            Esta é uma página de teste para verificar a integração entre frontend e backend.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg inline-block">
            <p className="text-sm text-blue-800">
              <strong>Backend:</strong> http://localhost:3001 <br/>
              <strong>Frontend:</strong> http://localhost:3000
            </p>
          </div>
        </div>

        <PaymentGateway
          amount={2500} // R$ 25,00
          currency="brl"
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />

        <div className="mt-8 text-center">
          <div className="bg-yellow-50 p-4 rounded-lg inline-block">
            <h3 className="font-bold text-yellow-800 mb-2">Como Funciona:</h3>
            <ol className="text-sm text-yellow-700 text-left">
              <li>1. Frontend verifica conexão com backend (porta 3001)</li>
              <li>2. Usuário preenche dados do cartão</li>
              <li>3. Frontend envia dados para backend</li>
              <li>4. Backend cria Payment Intent no Stripe</li>
              <li>5. Frontend recebe clientSecret</li>
              <li>6. Pagamento é processado</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPayment;