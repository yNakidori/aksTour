// Backend API para processar pagamentos com Stripe
// Este arquivo deve ser usado em seu servidor Node.js/Express

const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');

// Endpoint para criar Payment Intent
const createPaymentIntent = async (req, res) => {
  const { amount, cart, customerInfo } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: 'brl',
      metadata: {
        cart: JSON.stringify(cart),
        customerName: customerInfo?.name,
        customerEmail: customerInfo?.email,
      },
      description: 'Compra de pacotes AksTour',
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Erro ao criar Payment Intent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint para confirmar pagamento
const confirmPayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Aqui você pode:
      // 1. Salvar a venda no banco de dados
      // 2. Enviar email de confirmação
      // 3. Gerar vouchers/tickets
      // 4. Atualizar estoque

      res.json({
        success: true,
        message: 'Pagamento confirmado com sucesso',
        paymentIntent,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Pagamento não foi concluído',
      });
    }
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({ error: error.message });
  }
};

// Webhook para receber eventos do Stripe
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_YOUR_WEBHOOK_SECRET';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent foi bem sucedido:', paymentIntent.id);
      // Processar confirmação de pagamento
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent falhou:', failedPayment.id);
      // Notificar usuário sobre falha
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  handleStripeWebhook,
};
