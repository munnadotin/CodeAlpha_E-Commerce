import type { Product } from "./product.type";

export interface CartType {
    user: string;
    _id: string;
    items: {
        product: Product;
        quantity: number;
        _id: string;
    }[];
    total: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
