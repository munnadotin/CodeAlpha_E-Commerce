import mongoose from "mongoose";
import type { IUser } from "../types/user.types.";

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }, 
    role: {
        type: String, 
        enum: ["user", "admin"],
        default: "user"
    }, 
    address: [addressSchema]
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);