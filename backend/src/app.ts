import express from "express";
import { authRouter } from "./routes/auth.route";
import { productRouter } from "./routes/product.route";

export const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Routes - Authentication
 * @route /api/auth
 * @access Public
 */
app.use("/api/auth", authRouter);

/**
 * Routes - Product
 * @route /api/products
 * @access Public
 */
app.use("/api/products", productRouter);
