// Serviço para comunicação com o backend
const BACKEND_URL = 'http://localhost:3001';

// Função para fazer requisições HTTP
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${BACKEND_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Testar conexão com o backend
export async function testConnection() {
  return apiRequest('/health');
}

// Criar intenção de pagamento no Stripe
export async function createPaymentIntent(paymentData) {
  return apiRequest('/api/stripe/payment-intent', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  });
}

// Confirmar pagamento
export async function confirmPayment(paymentIntentId) {
  return apiRequest('/api/stripe/confirm-payment', {
    method: 'POST',
    body: JSON.stringify({ paymentIntentId })
  });
}

export default {
  testConnection,
  createPaymentIntent,
  confirmPayment
};