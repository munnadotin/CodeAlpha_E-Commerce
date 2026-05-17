import mongoose from "mongoose";

export interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    rating: number;
    reviews: number;
    createdAt: Date;
    updatedAt: Date;
}