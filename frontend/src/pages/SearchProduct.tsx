import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { searchProductThunk } from "../api/productThunk";
import Loader from "../components/ui/Loader";
import ProductCard from "../components/ProductCard";
import { Search, ChevronRight } from "lucide-react";

function SearchProduct() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(searchProductThunk(query));
    }
  }, [query, dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium capitalize">{query}</span>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Search Results for{" "}
            <span className="font-semibold">"{query}"</span>
          </h1>
          <p className="text-gray-400">
            {products?.length || 0} {products?.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {!products || products.length === 0 ? (
          // No Results State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-300" strokeWidth={1} />
            </div>
            <h2 className="text-xl font-light text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or browse our categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Browse All Products
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-200 text-sm font-medium hover:border-gray-400 transition"
              >
                Go to Homepage
              </Link>
            </div>

            {/* Suggestions */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Try searching for</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["electronics", "fashion", "accessories", "mobile", "laptop"].map((suggestion) => (
                  <Link
                    key={suggestion}
                    to={`/products/search?q=${suggestion}`}
                    className="px-4 py-2 bg-gray-50 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition rounded-full"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count Bar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {products.length} result{products.length !== 1 ? 's' : ''}
              </p>
              <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;