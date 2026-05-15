import jwt from "jsonwebtoken";

export const generateToken = (user: { id: string }) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};