import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/user.types.";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);

// Hash password before saving
userSchema.pre("save", async function (): Promise<void> {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//  Methods for password comparison
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};