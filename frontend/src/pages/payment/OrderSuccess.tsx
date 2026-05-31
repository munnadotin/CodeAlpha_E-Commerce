import { Check, Package, Truck, Clock, Receipt, Copy } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../app/store"
import { useEffect } from "react";
import { getOrderByIdThunk } from "../../api/orderThunk";
import CirLoader from "../../components/Loader";

function OrderSuccess() {
    const { currentOrder, loading } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();
    const [params] = useSearchParams();
    const orderId = params.get("orderId");

    useEffect(() => {
        if (orderId && !currentOrder) {
            dispatch(getOrderByIdThunk(orderId));
        }
    }, [orderId, currentOrder, dispatch])

    if (loading) return <CirLoader />;

    const handleCopyOrderId = async () => {
        if (currentOrder?._id) {
            try {
                await navigator.clipboard.writeText(currentOrder._id);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    const displayOrderId = currentOrder?._id || orderId || 'N/A';

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Main Success Card */}
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow overflow-hidden">
                    {/* Success Header */}
                    <div className="relative bg-linear-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative">
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <Check className="w-14 h-14 text-white" strokeWidth={2} />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
                            <p className="text-green-100">Your order has been placed successfully</p>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 md:p-8">
                        {/* Order Number */}
                        <div className="text-center pb-6 border-b border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Order Number</p>
                            <p className="text-xl font-mono font-semibold text-gray-800">
                                #{displayOrderId.slice(-8).toUpperCase()}
                            </p>
                            <button
                                onClick={handleCopyOrderId}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mx-auto cursor-pointer"
                            >
                                <Copy className="w-3 h-3" />
                                Copy Order ID
                            </button>
                        </div>

                        {/* Delivery Timeline */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <p className="text-xs text-gray-500">Est. Delivery</p>
                                <p className="text-sm font-semibold text-gray-700">3-5 days</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Truck className="w-5 h-5 text-purple-600" />
                                </div>
                                <p className="text-xs text-gray-500">Shipping</p>
                                <p className="text-sm font-semibold text-gray-700">Free</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Package className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs text-gray-500">Items</p>
                                <p className="text-sm font-semibold text-gray-700">{currentOrder?.items?.length || 0}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 space-y-3">
                            <Link to={'/profile'} className="w-full bg-linear-to-r from-gray-800 to-gray-900 text-white py-3 rounded-md font-semibold hover:from-gray-900 hover:to-black transition flex items-center justify-center gap-2 cursor-pointer">
                                <Receipt className="w-4 h-4" />
                                View Order Details
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Continue Shopping Link */}
                <div className="text-center mt-6">
                    <Link to={'/'} className="text-blue-600 hover:text-blue-700 font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess