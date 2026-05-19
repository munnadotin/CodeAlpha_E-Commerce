import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

// Register a new user
const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user already exists
        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        // return user
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Login a user
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check user exists
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // generate token
        const accessToken = generateToken({ id: user._id as string });

        // return user
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// add address
const addAddress = async (req: Request, res: Response) => {
    try {
        const { street, city, state, zipCode, country } = req.body;

        const userId = (req as any).user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.address.push({
            street,
            city,
            state,
            zipCode,
            country
        });

        // save user
        await user.save();

        // return user
        res.status(200).json({
            success: true,
            message: "Address added successfully",
            user
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// update address
const updateAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { street, city, state, zipCode, country } = req.body;

        const user = await User.findById((req as any).user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const address = user.address.find((addr: any) => addr._id.toString() === id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zipCode = zipCode || address.zipCode;
        address.country = country || address.country;

        // save user
        await user.save();

        // return user
        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// delete address
const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findById((req as any).user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const address = user.address.find((addr: any) => addr._id.toString() === id);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        user.address = user.address.filter((addr: any) => addr._id.toString() !== id);

        // save user
        await user.save();

        // return user
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            user
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const authController = {
    register,
    login,
    addAddress,
    updateAddress,
    deleteAddress
}