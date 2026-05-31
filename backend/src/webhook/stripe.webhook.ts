import { Request, Response } from 'express';
import stripe from '../config/stripe';
import { Payment } from '../models/payment.model';
import { Order } from '../models/order.model';

const stripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

    } catch (err: any) {
        console.log((err).message);
        return res.status(400).send(
            `Webhook Error: ${err.message}`
        );
    }

    // Payment success 
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        console.log(session.id)
        console.log(orderId)
        try {

            // Payment Update
            await Payment.findOneAndUpdate({ stripeSessionId: session.id }, {
                paymentStatus: 'paid',
                transactionId: session.payment_intent,
                stripePaymentIntentId: session.payment_intent,
                paymentDate: new Date(),
            });

            // Order Update
            await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid", orderStatus: "confirmed" });

            console.log("Order updated successfully");

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    res.json({
        recevied: true
    })
}

export default stripeWebhook;