const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Criar Payment Intent (para processar pagamento)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'brl', description } = req.body;

    // Validação básica
    if (!amount || amount < 50) { // Stripe mínimo: 50 centavos
      return res.status(400).json({ 
        error: 'Valor mínimo é R$ 0,50' 
      });
    }

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency,
      description: description || 'Compra AKS Tour',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Erro ao criar Payment Intent:', error);
    res.status(500).json({ 
      error: 'Erro ao processar pagamento',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Confirmar pagamento (opcional - para verificação adicional)
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Converter de centavos
      currency: paymentIntent.currency
    });

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao confirmar pagamento' 
    });
  }
});

// Rota de teste
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Rotas Stripe funcionando!',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY
  });
});

module.exports = router;