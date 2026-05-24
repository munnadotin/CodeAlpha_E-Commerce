import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { productByCategoryThunk } from "../api/productThunk";
import ProductCard from "../components/ProductCard";
import Error from "../components/Error";
import { ShoppingBag } from "lucide-react";
import CirLoader from "../components/Loader";
import Loader from "../components/ui/Loader";

export default function Products() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { categoryProducts, pagination, loading, error } = useSelector((state: RootState) => state.products);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(productByCategoryThunk(slug!));
    }, [slug, currentPage, dispatch]);

    const categoryName = slug;
    const totalProducts = categoryProducts.length;

    if (loading && categoryProducts.length === 0) return <CirLoader />;

    if (error) return <Error error={error} navigate={navigate} />

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="max-w-2xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                            <button onClick={() => navigate('/')} className="hover:text-gray-600 transition">Home</button>
                            <span>/</span>
                            <button onClick={() => navigate('/')} className="hover:text-gray-600 transition">Products</button>
                            <span>/</span>
                            <span className="text-gray-900 capitalize">{categoryName}</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-4 capitalize">
                            {categoryName}
                        </h1>
                        <p className="text-gray-500 max-w-md leading-relaxed">
                            Explore our curated collection of premium {categoryName} products
                        </p>

                        <div className="mt-6">
                            <span className="text-sm text-gray-400">
                                {totalProducts} {totalProducts === 1 ? 'product' : 'products'} available
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                {/* Filters and Sorting Bar */}
                
                {/* Products */}
                {categoryProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                            <ShoppingBag strokeWidth={0.5} className="h-10 w-10" />
                        </div>
                        <h3 className="text-lg font-light text-gray-900 mb-2">No products found</h3>
                        <p className="text-sm text-gray-400">Try adjusting your filters or browse other categories</p>
                    </div>
                ) : (
                    <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10"}>
                        {categoryProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {/* Loading More Indicator */}
                {loading && categoryProducts.length > 0 && (<Loader />)}
            </div>
        </div>
    );
}
