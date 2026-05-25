import type { address } from "./auth.type";
import type { Product } from "./product.type";

export interface OrdersType {
    _id: string;
    createdAt: string;
    shoppingAddress: address,
    total: number,
    items: Product[],
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
    paymentMethod: 'cod' | 'upi',
    paymentStatus: "pending" | "paid" | "failed",
}