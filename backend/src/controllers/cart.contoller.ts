import { Request, Response } from "express";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";

const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({
            user: (req as any).user?.id,
        }).populate({
            path: "items.product",
            populate: {
                path: "category",
            },
        });

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
};

const addCartItem = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ user: (req as any).user?.id });
        if (!cart) {
            cart = await Cart.create({
                user: (req as any).user?.id,
                items: [{
                    product: productId,
                    quantity
                }],
                total: 0
            });

        } else {
            // check if product already exists in cart
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity
                });
            }

            await cart.save();
        }

        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            total += item.quantity * product!.price;
        }

        cart.total = total;
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
};

const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { action } = req.body;

        if (!id || !action) {
            return res.status(400).json({
                success: false,
                message: "Product ID and action are required"
            });
        }

        const cart = await Cart.findOne({ user: (req as any).user?.id }).populate({ path: "items.product", populate: { path: "category" } });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(item => item._id.toString() === id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        if (action === "increase") {
            item.quantity++;
        } else {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.items.pull(item._id);
            }
        }

        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            total += item.quantity * product!.price;
        }

        cart.total = total;
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Item updated",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
};

const removeCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        let cart = await Cart.findOne({ user: (req as any).user?.id }).populate({ path: "items.product", populate: { path: "category" } });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter((item: any) => item.product._id.toString() !== id) as any;

        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            total += item.quantity * product!.price;
        }

        cart.total = total;
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
};

export const cartController = {
    getCart,
    addCartItem,
    updateCartItem,
    removeCartItem
};
