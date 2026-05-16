import { Request, Response } from "express";
import { uploadImage } from "../services/storage.service";
import { Product } from "../models/product.model";

const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const files = req.files as Express.Multer.File[];
        const images = files.map(async (file) => {
            return await uploadImage(file.buffer, file.originalname);
        })

        // Upload images to imagekit
        const results = await Promise.all(images);

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check product exists
        const existingProduct = await Product.findOne({
            name,
            description
        });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product already exists",
            });
        }

        // Create new product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            images: results.filter((image): image is { url: string } => !!image && typeof image.url === 'string').map((image) => image.url),
        });

        // Return the uploaded images
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Find products with pagination
        const products = await Product.find().limit(Number(limit)).skip((Number(page) - 1) * Number(limit));

        if (!products || products.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Products not found",
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: 0,
                },
            });
        }

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total: products.length,
            },
            data: products,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        const files = req.files as Express.Multer.File[];

        const images = files.map(async (file) => {
            return await uploadImage(file.buffer, file.originalname);
        });

        // Upload images to imagekit
        const results = await Promise.all(images);

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            stock,
            $push: {
                images: results.filter((image): image is { url: string } => !!image && typeof image.url === 'string').map((image) => image.url)
            }
        }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const productController = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct, 
    deleteProduct
};