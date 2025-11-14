import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { amount, customerInfo } = req.body;

        const paymentIntent =await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
            receipt_email: customerInfo?.email,
            metadata: {
                customerName: customerInfo?.name || "Cliente",
            }
        });

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            id: paymentIntent.id,
        });
    } catch (error) {
        console.log("Stripe Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
}