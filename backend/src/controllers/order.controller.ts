import { Request, Response } from "express"
import { Cart } from "../models/cart.model"
import { Order } from "../models/order.model";
import createCheckoutSession from "../services/payment.service";
import { Payment } from "../models/payment.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { paymentMethod } = req.body;

        if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Payment method is required"
            });
        }

        const cartItems = await Cart.findOne({ user: (req as any).user._id })
            .populate("items.product");

        if (!cartItems || cartItems.items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const orderItems = cartItems.items.map((item: any) => {
            const product = item.product;
            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                name: product.name,
                image: product.images?.[0]
            };
        });
        const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        const order = {
            items: orderItems,
            total: totalPrice,
            user: (req as any).user._id,
            paymentMethod,
            shoppingAddress: (req as any)?.user?.address?.[0]
        };

        // create order only when payment method is COD
        let newOrder;
        if (paymentMethod === "cod") {
            newOrder = await Order.create(order);

            // clear only current user's cart
            await Cart.updateOne(
                { user: (req as any).user._id },
                { $set: { items: [] } }
            );

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: newOrder
            });
        } else {
            console.log("COD/UPI BLOCK ENTERED");
            newOrder = await Order.create(order);
            console.log("ORDER CREATED", newOrder._id);

            const session = await createCheckoutSession({
                cartItems: orderItems,
                orderId: newOrder._id.toString(),
                userId: (req as any).user._id.toString()
            })
            console.log("SESSION CREATED", session.url);
            await Payment.create({
                order: newOrder._id,
                user: (req as any).user._id,
                amount: totalPrice,
                paymentMethod: "upi",
                paymentStatus: "pending",
                stripeSessionId: session.id
            });

            // clear only current user's cart
            await Cart.updateOne(
                { user: (req as any).user._id },
                { $set: { items: [] } }
            );

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: {
                    sessionUrl: session.url,
                    order: newOrder
                }
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error instanceof Error ? error.message : "Internal server error"
        });
    }
};

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: (req as any).user._id }).populate({ path: "items.product", populate: { path: "category" } });

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id).populate({ path: "items.product", populate: { path: "category" } });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { status, paymentStatus } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.status = status || order.status;
        order.paymentStatus = paymentStatus || order.paymentStatus;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
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
    getAllOrders
}

