import { Request, Response } from "express"
import { Cart } from "../models/cart.model"
import { Order } from "../models/order.model";
import { IProduct } from "../types/product.type";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { paymentMethod, shippingAddress } = req.body;
        const cartItems = await Cart.findOne({ user: (req as any).user._id }).populate("items.product");

        if (!cartItems) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            })
        }

        const orderItems = cartItems.items.map(item => {
            const product = item.product as unknown as IProduct;
            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                name: product.name,
                image: product.images[0],
            }
        });

        const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // create order
        const order = await Order.create({
            items: orderItems,
            total: totalPrice,
            user: (req as any).user._id,
            paymentMethod,
            shippingAddress,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

export const orderController = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
}

