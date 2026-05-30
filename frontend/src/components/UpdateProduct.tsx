import { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store";
import type { FormData, Product } from "../types/product.type";
import { useForm } from "react-hook-form";
import CirLoader from "./Loader";
import { X, Upload, XCircle } from "lucide-react";
import { useState } from "react";

type Props = {
    onClose: () => void;
    product?: Product | null;
    onSubmit: (data: FormData) => void;
    isSubmitting?: boolean;
}

function ProductForm({ onClose, product, onSubmit, isSubmitting = false }: Props) {
    const { categories, loading } = useSelector((state: RootState) => state.categories);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || 0,
            stock: product?.stock || 0,
            category: product?.category?._id || "",
            discount: product?.discount || 0,
            images: []
        }
    });

    useEffect(() => {
        if (product?.images) {
            setImagePreview(product.images);
        }
    }, [product]);

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(prev => [...prev, ...files]);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(prev => [...prev, ...previews]);
    };

    const removeImage = (index: number) => {
        setImagePreview(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmitForm = (data: FormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("stock", data.stock.toString());
        formData.append("category", data.category);
        formData.append("discount", data.discount?.toString() || "0");

        imageFiles.forEach(file => {
            formData.append("images", file);
        });

        onSubmit(formData as any);
    };

    if (loading) return <CirLoader />;

    const isEditMode = !!product;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isEditMode ? "Update Product" : "Add New Product"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-5">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Product name is required" })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition"
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition resize-none"
                            placeholder="Enter product description"
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Price and Stock Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 1, message: "Price must be greater than 0" }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition"
                                placeholder="0"
                            />
                            {errors.price && (
                                <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock *
                            </label>
                            <input
                                type="number"
                                {...register("stock", {
                                    required: "Stock is required",
                                    min: { value: 0, message: "Stock cannot be negative" }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition"
                                placeholder="0"
                            />
                            {errors.stock && (
                                <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Category and Discount Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category *
                            </label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition capitalize"
                            >
                                <option value="">Select category</option>
                                {categories?.map((cat) => (
                                    <option key={cat._id} value={cat._id} className="capitalize">
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                {...register("discount")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition"
                                placeholder="0"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Images
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700">
                                        <span>Upload images</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="sr-only"
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                        </div>

                        {/* Image Preview */}
                        {imagePreview.length > 0 && (
                            <div className="mt-3 grid grid-cols-4 gap-2">
                                {imagePreview.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={img}
                                            alt={`Preview ${idx + 1}`}
                                            className="w-full h-20 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting
                                ? (isEditMode ? "Updating..." : "Creating...")
                                : (isEditMode ? "Update Product" : "Create Product")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;