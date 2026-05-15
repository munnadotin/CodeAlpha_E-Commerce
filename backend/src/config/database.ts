import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`connection establised successfully : ${res.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}