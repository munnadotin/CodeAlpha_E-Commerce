import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import CirLoader from "../../components/Loader";
import { useState } from "react";
import { Plus, Eye, SquarePen, Trash2, Package } from "lucide-react";
import ProductForm from "../../components/UpdateProduct";
import type { FormData, Product } from "../../types/product.type";
import { createProductThunk, deleteProductThunk, productThunk, updateProductThunk } from "../../api/productThunk";

function ProductPage() {
    const { products, loading } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateProduct = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await dispatch(createProductThunk(formData));
            await dispatch(productThunk());
            setShowCreateModal(false);
        } catch (error) {
            console.error("Create failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateProduct = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await dispatch(updateProductThunk({ productId: selectedProduct.slug, data: formData }));
            await dispatch(productThunk());
            setSelectedProduct(null);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProduct = async (product: string) => {
        await dispatch(deleteProductThunk(product));
        await dispatch(productThunk());
    };

    if (loading) return <CirLoader />;

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-100 bg-gray-50/30 px-6 md:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                {products?.length || 0} total products
                            </p>
                        </div>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                    {products?.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                                <Package className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-500">No products found</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                Create your first product
                            </button>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products?.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                                    <img
                                                        src={product.images?.[0] || "/placeholder.png"}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        {product.slug?.slice(-20) || product._id?.slice(-8)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
                                                {product.discount > 0 && (
                                                    <p className="text-xs text-green-600">-{product.discount}%</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10
                                                ? 'bg-green-50 text-green-700'
                                                : product.stock > 0
                                                    ? 'bg-yellow-50 text-yellow-700'
                                                    : 'bg-red-50 text-red-700'
                                                }`}>
                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 capitalize">
                                                {product.category?.name || "Uncategorized"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition"
                                                    title="Edit"
                                                >
                                                    <SquarePen className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.slug)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Create Product Modal */}
            {showCreateModal && (
                <ProductForm
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateProduct}
                    isSubmitting={isSubmitting}
                />
            )}

            {/* Update Product Modal */}
            {selectedProduct && (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onSubmit={handleUpdateProduct}
                    isSubmitting={isSubmitting}
                />
            )}
        </>
    );
}

export default ProductPage;