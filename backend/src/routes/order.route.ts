import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const orderRouter = Router();

// POST /api/orders - Create order
orderRouter.post("/", authMiddlware, orderController.createOrder);

// GET /api/orders - Get user's orders
orderRouter.get("/", authMiddlware, orderController.getOrders);

// GET /api/orders/:id - Get order by id
orderRouter.get("/:id", authMiddlware, orderController.getOrderById);

// PUT /api/orders/:id - Update order
orderRouter.put("/:id", authMiddlware, orderController.updateOrder);
