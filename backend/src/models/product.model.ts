import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        images: {
            type: [{
                type: String,
                required: [true, "Image URL is required"],
            }],
            validate: {
                validator: function (value: string[]) {
                    return value.length > 0;
                },
                message: "At least one image is required",
            },
        },
        stock: {
            type: Number,
            default: 1,
        },
        ratings: {
            type: Number,
            default: 0,
        },
        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);