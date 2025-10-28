# Configuração do Stripe para AksTour Store

## 📋 Pré-requisitos

1. Criar uma conta no [Stripe](https://stripe.com)
2. Obter as chaves de API (Test e Live)

## 🔑 Chaves de API

### No Dashboard do Stripe:
1. Acesse: https://dashboard.stripe.com/test/apikeys
2. Copie:
   - **Publishable key** (começa com `pk_test_`)
   - **Secret key** (começa com `sk_test_`)

## ⚙️ Configuração Frontend

### 1. Atualizar Store.jsx

Substitua a linha 8 em `src/Store.jsx`:

```javascript
const stripePromise = loadStripe('pk_test_SUA_CHAVE_PUBLICA_AQUI');
```

### 2. Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
```

E use no código:

```javascript
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
```

## 🖥️ Configuração Backend

### 1. Instalar dependências no servidor:

```bash
npm install stripe express cors body-parser
```

### 2. Criar servidor Express:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripeRoutes = require('./routes/stripe');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas do Stripe
app.use('/api/stripe', stripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

### 3. Criar arquivo de rotas:

```javascript
// routes/stripe.js
const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../api/stripePayment');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);

module.exports = router;
```

### 4. Configurar variáveis de ambiente no servidor:

```env
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
STRIPE_WEBHOOK_SECRET=whsec_sua_webhook_secret_aqui
PORT=5000
```

## 🔗 Integração Frontend com Backend

Atualize o `CheckoutForm` em `Store.jsx`:

```javascript
const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!stripe || !elements) return;

  setLoading(true);
  setError(null);

  try {
    // Criar Payment Intent no backend
    const response = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: total,
        cart: cart,
        customerInfo: {
          name: 'Nome do Cliente',
          email: 'email@cliente.com'
        }
      }),
    });
    
    const { clientSecret } = await response.json();

    // Confirmar pagamento
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Nome do Cliente',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    }
  } catch (err) {
    setError('Erro ao processar pagamento. Tente novamente.');
  } finally {
    setLoading(false);
  }
};
```

## 🧪 Testar Pagamentos

### Cartões de Teste do Stripe:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **Autenticação 3D Secure**: `4000 0025 0000 3155`

**Data de validade**: Qualquer data futura  
**CVV**: Qualquer 3 dígitos  
**CEP**: Qualquer CEP válido

## 🔒 Segurança

### ⚠️ IMPORTANTE:

1. **NUNCA** exponha sua Secret Key no frontend
2. Use variáveis de ambiente para todas as chaves
3. Adicione `.env` ao `.gitignore`
4. Sempre valide dados no backend
5. Use HTTPS em produção

## 📱 Webhooks (Opcional)

Webhooks permitem que o Stripe notifique seu servidor sobre eventos:

1. Acesse: https://dashboard.stripe.com/test/webhooks
2. Clique em "Add endpoint"
3. URL: `https://seu-servidor.com/api/stripe/webhook`
4. Selecione eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copie a "Signing secret"

## 🚀 Produção

### Antes de ir para produção:

1. Substitua chaves de teste (`pk_test_`, `sk_test_`) pelas chaves live
2. Ative o modo Live no Dashboard do Stripe
3. Configure webhooks para produção
4. Teste todos os fluxos de pagamento
5. Configure tratamento de erros robusto
6. Implemente logs de transações

## 📚 Recursos Adicionais

- [Documentação do Stripe](https://stripe.com/docs)
- [Stripe React](https://stripe.com/docs/stripe-js/react)
- [Testing Stripe](https://stripe.com/docs/testing)
- [Webhooks](https://stripe.com/docs/webhooks)

## 🆘 Suporte

Se tiver problemas:
1. Verifique o Console do navegador
2. Verifique os logs do servidor
3. Consulte o Dashboard do Stripe > Logs
4. Acesse a documentação oficial
