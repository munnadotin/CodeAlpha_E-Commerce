import { Request, Response } from "express";
import { uploadImage } from "../services/storage.service";

const uploadProductImages = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        const images = files.map(async (file) => {
            return await uploadImage(file.buffer, file.originalname);
        })

        const results = await Promise.all(images);

        res.status(200).json({
            success: true,
            message: "Images uploaded successfully",
            data: results.map((result) => result.url),
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

export const productController = {
    uploadProductImages
};