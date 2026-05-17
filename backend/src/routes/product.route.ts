import { Router } from "express";
import { upload } from "../middlewares/upload";
import { authMiddlware } from "../middlewares/auth.middleware";
import { productController } from "../controllers/product.controller";
import { isAdmin } from "../middlewares/role.middleware";

export const productRouter = Router();

/**
 * @description Add product images
 * @route POST /api/products/create
 * @access private (only admin)
 */
productRouter.post("/create", upload.array("images", 5), authMiddlware, isAdmin(), productController.addProduct);

/**
 * @description Get all products
 * @route GET /api/products
 * @access public
 */
productRouter.get("/", productController.getAllProducts);

/**
 * @description Search products
 * @route GET /api/products/search
 * @access public
 */
productRouter.get("/search", productController.searchProducts);

/**
 * @description Get product by id
 * @route GET /api/products/:id
 * @access public
 */
productRouter.get("/:id", productController.getProductById);

/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access public (only admin)
 */
productRouter.patch("/:id", upload.array("images", 5), authMiddlware, isAdmin(), productController.updateProduct);

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access public (only admin)
 */
productRouter.delete("/:id", authMiddlware, isAdmin(), productController.deleteProduct);

