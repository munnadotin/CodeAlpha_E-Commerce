import { Request, Response } from "express";
import createCheckoutSessionService from "../services/payment.service";
import { Payment } from "../models/payment.model";

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { cartItems, orderId, totalAmount } = req.body;
        const session = await createCheckoutSessionService({ cartItems, orderId, userId: (req as any)?.user?._id });

        await Payment.create({
            order: orderId,
            user: (req as any).user._id,
            amount: totalAmount,
            paymentMethod: "upi",
            paymentStatus: "pending",
            stripeSessionId: session.id
        });

        res.json({
            status: "success",
            url: session.url
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

export default createCheckoutSession;