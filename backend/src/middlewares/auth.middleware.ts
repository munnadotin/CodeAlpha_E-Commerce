import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

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
        (req as any).user = decoded.id;

        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}