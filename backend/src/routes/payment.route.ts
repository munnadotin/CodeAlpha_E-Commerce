import { Router } from "express";
import createCheckoutSession from "../controllers/payment.controller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const paymentRouter = Router();

// POST /api/payments - Create payment
paymentRouter.post("/create-checkout-session", authMiddlware, createCheckoutSession);
