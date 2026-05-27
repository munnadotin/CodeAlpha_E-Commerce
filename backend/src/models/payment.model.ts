import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "INR"
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "upi"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    stripeSessionId: {
        type: String,
    },
    stripePaymentIntentId: {
        type: String,
    },
    transactionId: {
        type: String,
    },
    paymentDate: {
        type: Date,
    },
}, {
    timestamps: true
});

export const Payment = mongoose.model("Payment", paymentSchema);
