import express from "express";
import { authRouter } from "./routes/auth.route";
import { productRouter } from "./routes/product.route";
import { cartRouter } from "./routes/cart.route";
import { orderRouter } from "./routes/order.route";
import { paymentRouter } from "./routes/payment.route";
import cors from "cors";

export const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
}))

/**
 * Routes - Authentication
 * @route /api/auth
 * @access Public
 */
app.use("/api/auth", authRouter);

/**
 * Routes - Product
 * @route /api/products
 * @access Public || Private (for admin)
 */
app.use("/api/products", productRouter);

/**
 * Routes - Cart
 * @route /api/cart
 * @access private
 */
app.use("/api/cart", cartRouter);

/**
 * Routes - Order
 * @route /api/orders
 * @access private
 */
app.use("/api/orders", orderRouter);

/**
 * Routes - Payment
 * @route /api/payments
 * @access private
 */
app.use("/api/payments", paymentRouter);
