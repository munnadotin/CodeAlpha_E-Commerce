import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { productBySlugThunk } from '../api/productThunk';
import { Minus, Plus, ShoppingCart, ChevronRight, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import CirLoader from './Loader';
import { addCartItemThunk } from '../api/cartThunk';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, productDetails } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(productBySlugThunk(slug!));
  }, [slug, dispatch]);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [productDetails]);

  if (loading || !productDetails) return <CirLoader />;

  const discountedPrice = productDetails.discount
    ? productDetails.price - (productDetails.price * productDetails.discount / 100)
    : productDetails.price;

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Breadcrumb Section */}
      <div className="border-b border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link
              to={`/products/category/${productDetails.category.slug}`}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 capitalize"
            >
              {productDetails.category.name}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium truncate max-w-50 md:max-w-none">
              {productDetails.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Product Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4 aspect-square">
              <img
                src={productDetails.images[selectedImage]}
                alt={productDetails.name}
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
              {productDetails.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  -{productDetails.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productDetails.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === idx
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-400'
                    }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            {/* Category & Actions */}
            <div className="flex items-center justify-between mb-4">
              <Link
                to={`/products/category/${productDetails.category.slug}`}
                className="text-xs text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
              >
                {productDetails.category.name}
              </Link>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-2xl lg:text-2xl font-light text-gray-900 mb-3 leading-tight">
              {productDetails.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(productDetails.ratings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                ({productDetails.ratings || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {productDetails.discount > 0 ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-semibold text-gray-900">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{productDetails.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save {productDetails.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl md:text-4xl font-semibold text-gray-900">
                  ₹{productDetails.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className={`relative flex h-2 w-2`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${productDetails.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${productDetails.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
                <span className={`text-sm font-medium ${productDetails.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {productDetails.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {productDetails.stock > 0 && (
                <span className="text-xs text-gray-400">({productDetails.stock} units available)</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Description
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {/* Quantity Selector */}
            {user.role !== "admin" && (
              < div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(productDetails.stock, quantity + 1))}
                      disabled={quantity >= productDetails.stock}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    Max {productDetails.stock} units
                  </span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            {user.role !== "admin" && (
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to add items to cart");
                    return;
                  }
                  dispatch(addCartItemThunk({ productId: productDetails._id, quantity }));
                  toast.success("Item added into cart successfully");
                }}
                disabled={productDetails.stock === 0}
                className={`flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${productDetails.stock > 0 ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-98' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                <ShoppingCart className="w-5 h-5" />
                <span>{productDetails.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            )}

            {/* Delivery Info Cards */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Free Shipping</p>
                  <p className="text-[10px] text-gray-400">On orders ₹999+</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Easy Returns</p>
                  <p className="text-[10px] text-gray-400">7 days policy</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Secure Payment</p>
                  <p className="text-[10px] text-gray-400">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductDetail;