// API Serverless da Vercel para criar Payment Intent do Stripe
// Endpoint: /api/create-payment-intent

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Lidar com preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, cart, customerInfo } = req.body;

    // Validações
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cartItems: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))),
        customerName: customerInfo?.name || 'Cliente',
        customerEmail: customerInfo?.email || '',
        orderDate: new Date().toISOString(),
      },
      description: `Compra AksTour - ${cart.length} item(ns)`,
    });

    // Retornar client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Erro ao criar Payment Intent:', error);
    res.status(500).json({ 
      error: 'Erro ao processar pagamento',
      message: error.message 
    });
  }
};
