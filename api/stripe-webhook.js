import Stripe from "stripe";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) chunks.push(chunk);
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end("Método não permitido");
    }

    const sig = req.handlers["stripe-signature"];
    const buf = await buffer(req);
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, secret);
    } catch (err) {
        console.error("Erro no Webhook:", err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            console.log("Pagamento confirmado");
            break;
        case "payment_intent.payment_failed":
            console.log("Pagamento falhou");
            break;
    }

    res.json({ received: true });
}