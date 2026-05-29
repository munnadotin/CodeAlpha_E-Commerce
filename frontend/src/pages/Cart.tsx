import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import Error from "../components/Error";
import { useNavigate, Link } from "react-router-dom";
import { cartThunk, removeCartItemThunk, updateCartItemThunk } from "../api/cartThunk";
import { ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartThunk());
  }, []);

  if (error) return <Error navigate={navigate} error={error} />;

  // Check if cart is empty
  const isCartEmpty = !products?.items || products.items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-wide text-gray-900">
            Shopping <span className="font-semibold">Cart</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {!isCartEmpty ? `${products.items.length} items in your cart` : "Your cart is waiting"}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isCartEmpty ? (
          // Empty Cart State
          <div className="bg-white rounded-xl border-2 border-slate-300 p-12 text-center">
            <div className="max-w-md mx-auto">
              <ShoppingBag strokeWidth={1.5} className="w-16 h-16 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-light text-gray-900 mb-2">
                Your cart is <span className="font-semibold">empty</span>
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all"
              >
                <ShoppingCart strokeWidth={1.5} className="h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {products.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="text-sm font-medium text-gray-900 line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            Category: {item.product.category?.name}
                          </p>
                        </div>
                        <button
                          onClick={() => { dispatch(removeCartItemThunk({ productId: item.product._id })) }}
                          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                          <Trash2 strokeWidth={1.5} className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Price */}
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.product.price}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                          <button onClick={() => dispatch(updateCartItemThunk({ cartItemId: item._id, action: "decrease" }))} className="px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Minus strokeWidth={1.5} className="h-5 w-5 text-gray-600" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button onClick={() => dispatch(updateCartItemThunk({ cartItemId: item._id, action: "increase" }))} className="px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Plus strokeWidth={1.5} className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{products.total || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">Included</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 mb-6">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{products.total || 0}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft strokeWidth={1.5} className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;