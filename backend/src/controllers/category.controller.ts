import { Request, Response } from 'express';
import { uploadImage } from '../services/storage.service';
import category from '../models/category.model';
import { generateSlug } from '../utils/slug';

const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await category.find();

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const file = req.file;
        const image = await uploadImage(file?.buffer!, `${file?.originalname!}-${Date.now()}`);

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image upload failed"
            });
        }

        const isCategoryExists = await category.findOne({ name });

        if (isCategoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const slug = generateSlug(name);

        const newCategory = await category.create({
            name,
            image: image.url!,
            slug
        });
        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            newCategory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}

export const categroyController = {
    getCategories,
    createCategory
}
