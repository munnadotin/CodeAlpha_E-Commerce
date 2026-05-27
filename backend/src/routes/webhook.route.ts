import express, { Router } from "express";
import stripeWebhook from "../webhook/stripe.webhook";

const Webhookrouter = Router();

Webhookrouter.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

export default Webhookrouter;
