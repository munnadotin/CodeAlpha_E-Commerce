import mongoose from "mongoose";

export interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: mongoose.Types.ObjectId;
    stock: number;
    ratings: number;
    discount: number;
    createdby: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}