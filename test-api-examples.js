// Exemplos de requisições para testar a API

// ============================================
// 1. Testar Payment Intent (JavaScript)
// ============================================

async function testCreatePaymentIntent() {
  try {
    const response = await fetch('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 500.00,
        cart: [
          {
            id: 1,
            name: 'Pacote Europa',
            price: 500.00,
            quantity: 1
          }
        ],
        customerInfo: {
          name: 'João Silva',
          email: 'joao@example.com'
        }
      })
    });

    const data = await response.json();
    console.log('Payment Intent criado:', data);
    return data.clientSecret;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// ============================================
// 2. Testar com cURL (Terminal)
// ============================================

/*
# Desenvolvimento local:
curl -X POST http://localhost:3000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500.00,
    "cart": [
      {
        "id": 1,
        "name": "Pacote Europa",
        "price": 500.00,
        "quantity": 1
      }
    ],
    "customerInfo": {
      "name": "João Silva",
      "email": "joao@example.com"
    }
  }'

# Produção (após deploy):
curl -X POST https://seu-site.vercel.app/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500.00,
    "cart": [
      {
        "id": 1,
        "name": "Pacote Europa",
        "price": 500.00,
        "quantity": 1
      }
    ],
    "customerInfo": {
      "name": "João Silva",
      "email": "joao@example.com"
    }
  }'
*/

// ============================================
// 3. Testar com PowerShell (Windows)
// ============================================

/*
$body = @{
    amount = 500.00
    cart = @(
        @{
            id = 1
            name = "Pacote Europa"
            price = 500.00
            quantity = 1
        }
    )
    customerInfo = @{
        name = "João Silva"
        email = "joao@example.com"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/create-payment-intent" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
*/

// ============================================
// 4. Testar Webhook Localmente
// ============================================

// Para testar webhooks localmente, use Stripe CLI:
// https://stripe.com/docs/stripe-cli

/*
# 1. Instalar Stripe CLI:
# https://stripe.com/docs/stripe-cli#install

# 2. Login:
stripe login

# 3. Forward webhooks para sua máquina local:
stripe listen --forward-to localhost:3000/api/stripe-webhook

# 4. Em outro terminal, criar um payment intent de teste:
stripe payment_intents create \
  --amount=50000 \
  --currency=brl \
  --payment-method-types=card

# 5. Ver eventos no primeiro terminal
*/

// ============================================
// 5. Cartões de Teste do Stripe
// ============================================

const testCards = {
  success: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Pagamento bem-sucedido'
  },
  
  declined: {
    number: '4000000000000002',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Cartão recusado'
  },
  
  insufficientFunds: {
    number: '4000000000009995',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Fundos insuficientes'
  },
  
  requires3DSecure: {
    number: '4000002500003155',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Requer autenticação 3D Secure'
  },
  
  brazil: {
    number: '4000000760000002',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
    description: 'Cartão BR que requer autenticação'
  }
};

// ============================================
// 6. Verificar se API está funcionando
// ============================================

async function healthCheck() {
  const endpoints = [
    'http://localhost:3000/api/create-payment-intent',
    'https://seu-site.vercel.app/api/create-payment-intent'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'OPTIONS', // Testar CORS
      });
      console.log(`✅ ${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.message}`);
    }
  }
}

// ============================================
// 7. Exemplo de Resposta Esperada
// ============================================

const expectedResponse = {
  success: {
    clientSecret: 'pi_xxx_secret_xxx',
    paymentIntentId: 'pi_xxx'
  },
  
  error: {
    error: 'Erro ao processar pagamento',
    message: 'Descrição detalhada do erro'
  }
};

// ============================================
// 8. Monitorar Logs
// ============================================

/*
# Ver logs da Vercel:
vercel logs --follow

# Ver logs do Stripe:
# Dashboard > Developers > Logs
# https://dashboard.stripe.com/test/logs

# Ver logs de webhook:
# Dashboard > Developers > Webhooks > seu endpoint > Events
*/

// ============================================
// 9. Debugar Erros Comuns
// ============================================

const commonErrors = {
  'Invalid API Key': {
    problem: 'Chave do Stripe incorreta ou não configurada',
    solution: 'Verifique STRIPE_SECRET_KEY no .env e na Vercel'
  },
  
  'CORS Error': {
    problem: 'Erro de Cross-Origin',
    solution: 'Verifique vercel.json e headers da API'
  },
  
  'Amount must be at least': {
    problem: 'Valor muito baixo',
    solution: 'Stripe requer mínimo de R$ 0.50 (50 centavos)'
  },
  
  '401 Unauthorized': {
    problem: 'Autenticação falhou',
    solution: 'Chave do Stripe expirada ou inválida'
  },
  
  'Webhook signature verification failed': {
    problem: 'Secret do webhook incorreto',
    solution: 'Verifique STRIPE_WEBHOOK_SECRET'
  }
};

// ============================================
// 10. Script Completo de Teste
// ============================================

async function runFullTest() {
  console.log('🧪 Iniciando testes...\n');

  // Teste 1: Health Check
  console.log('1️⃣ Health Check...');
  await healthCheck();

  // Teste 2: Criar Payment Intent
  console.log('\n2️⃣ Criando Payment Intent...');
  const clientSecret = await testCreatePaymentIntent();

  if (clientSecret) {
    console.log('✅ Payment Intent criado com sucesso!');
  } else {
    console.log('❌ Falha ao criar Payment Intent');
  }

  console.log('\n✅ Testes concluídos!');
}

// Executar teste
// runFullTest();

module.exports = {
  testCreatePaymentIntent,
  healthCheck,
  testCards,
  commonErrors
};
