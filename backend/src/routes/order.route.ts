import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authMiddlware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

export const orderRouter = Router();

// POST /api/orders - Create order
orderRouter.post("/", authMiddlware, orderController.createOrder);

// GET /api/orders - Get user's orders
orderRouter.get("/", authMiddlware, orderController.getOrders);

// GET /api/orders/:id - Get order by id
orderRouter.get("/:id", authMiddlware, orderController.getOrderById);

// PUT /api/orders/:id - Update order (only for admin)
orderRouter.put("/:id", authMiddlware, isAdmin(), orderController.updateOrder);

// GET /api/orders/admin - Get all orders (only for admin)
orderRouter.get("/admin", authMiddlware, isAdmin(), orderController.getAllOrders);