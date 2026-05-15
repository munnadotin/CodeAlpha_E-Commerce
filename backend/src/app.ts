import express from "express";

export const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Routes
 */
app.use("api/auth", );