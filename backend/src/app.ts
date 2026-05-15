import express from "express";
import { authRouter } from "./routes/auth.route";

export const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/api/auth", authRouter);