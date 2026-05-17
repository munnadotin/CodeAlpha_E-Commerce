import { Router } from "express";
import { cartController } from "../controllers/cart.contoller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const cartRouter = Router();

// GET /api/cart - Get user's cart
cartRouter.get("/", authMiddlware, cartController.getCart);

// POST /api/cart - Add item to cart
cartRouter.post("/", authMiddlware, cartController.addCartItem);

// PUT /api/cart/:id - Update cart item
cartRouter.put("/:id", authMiddlware, cartController.updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
cartRouter.delete("/:id", authMiddlware, cartController.removeCartItem);
