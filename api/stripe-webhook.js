// API Serverless da Vercel para webhooks do Stripe
// Endpoint: /api/stripe-webhook

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Função para processar o pagamento bem-sucedido
async function handleSuccessfulPayment(paymentIntent) {
  console.log('Pagamento bem-sucedido:', paymentIntent.id);
  
  // Aqui você pode:
  // 1. Salvar no banco de dados (Firebase, MongoDB, etc)
  // 2. Enviar email de confirmação
  // 3. Gerar vouchers
  // 4. Atualizar estoque
  
  const metadata = paymentIntent.metadata;
  const cartItems = JSON.parse(metadata.cartItems || '[]');
  
  console.log('Items comprados:', cartItems);
  console.log('Cliente:', metadata.customerName);
  console.log('Email:', metadata.customerEmail);
  
  // Exemplo: enviar para Firebase
  // await db.collection('orders').add({
  //   paymentIntentId: paymentIntent.id,
  //   status: 'paid',
  //   amount: paymentIntent.amount / 100,
  //   customer: metadata.customerName,
  //   items: cartItems,
  //   createdAt: new Date(),
  // });
  
  return true;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Processar eventos
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        console.log('✅ Payment successful:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Payment failed:', failedPayment.id);
        // Notificar usuário sobre falha
        break;

      case 'charge.succeeded':
        const charge = event.data.object;
        console.log('💰 Charge succeeded:', charge.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
