import { Router } from "express";
import { upload } from "../middlewares/upload";
import { authMiddlware } from "../middlewares/auth.middleware";
import { productController } from "../controllers/product.controller";

export const productRouter = Router();

/**
 * @description Add product images
 * @route POST /api/products/create
 * @access private (only admin)
 */
productRouter.post("/create", upload.array("images", 5), authMiddlware, productController.addProduct);

/**
 * @description Get all products
 * @route GET /api/products
 * @access public
 */
productRouter.get("/", productController.getAllProducts);

/**
 * @description Get product by id
 * @route GET /api/products/:id
 * @access Public
 */
productRouter.get("/:id", (req, res) => {
    res.send("Get product by id");
});

/**
 * @description Create a new product
 * @route POST /api/products
 * @access Public
 */
productRouter.post("/", (req, res) => {
    res.send("Create a new product");
});

/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access Public
 */
productRouter.put("/:id", (req, res) => {
    res.send("Update a product");
});

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Public
 */
productRouter.delete("/:id", (req, res) => {
    res.send("Delete a product");
});

