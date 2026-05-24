import { Request, Response } from "express";
import { uploadImage } from "../services/storage.service";
import { Product } from "../models/product.model";
import { generateSlug } from "../utils/slug";
import category from "../models/category.model";

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
        const slug = generateSlug(name);
        // Create new product
        const product = await Product.create({
            name,
            slug,
            description,
            price,
            discount: 0,
            category,
            stock,
            createdby: (req as any).user?._id,
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
        const products = await Product.find().populate("createdby", "name email").limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
        const totalProducts = await Product.countDocuments();

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
                totalProducts,
                totalPages: Math.ceil(totalProducts / Number(limit)),
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

const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug: slug as string }).populate('category', 'slug name').populate("createdby", "name email");

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
        const { slug } = req.params;
        const { name, description, price, category, stock } = req.body;
        const files = req.files as Express.Multer.File[];

        const images = files.map(async (file) => {
            return await uploadImage(file.buffer, file.originalname);
        });

        // Upload images to imagekit
        const results = await Promise.all(images);

        const product = await Product.findOneAndUpdate({ slug: slug as string }, {
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
        const { slug } = req.params;

        // check ownership
        const product = await Product.findOne({ slug: slug as string });
        if (product?.createdby?.toString() !== (req as any).user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product",
            });
        }

        const deletedProduct = await Product.findOneAndDelete({ slug: slug as string });

        if (!deletedProduct) {
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

const searchProducts = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $or: [
                { "name": { $regex: query as string, $options: "i" } },
                { "description": { $regex: query as string, $options: "i" } },
            ]
        }).populate("createdby", "name email").populate("category");

        // Add pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const productsWithPagination = products.slice(skip, skip + limit);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: productsWithPagination,
            pagination: {
                page,
                limit,
                total: products.length,
                totalPages: Math.ceil(products.length / limit)
            }
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const { cat } = req.params;
        const extractCategory = await category.findOne({ slug: cat as string });

        if (!extractCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const products = await Product.find({ category: extractCategory._id });

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const productsWithPagination = products.slice(skip, skip + limit);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: productsWithPagination,
            pagination: {
                page,
                limit,
                total: products.length,
                totalPages: Math.ceil(products.length / limit)
            }
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
    getProductBySlug,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
};