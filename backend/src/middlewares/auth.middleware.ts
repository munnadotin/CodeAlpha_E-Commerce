import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";

export async function authMiddlware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        // finding user by id
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        
        (req as any).user = user;

        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}