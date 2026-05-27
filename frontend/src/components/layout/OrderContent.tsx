import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { getOrdersThunk } from "../../api/orderThunk";
import CirLoader from "../Loader";
import { Package, ChevronRight, Calendar, Truck, CheckCircle, Clock } from "lucide-react";
import OrderDetails from "../OrderDetails";

export default function OrderContent() {
    const dispatch = useDispatch<AppDispatch>();
    const { ordersList, loading } = useSelector((state: RootState) => state.orders);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, [dispatch]);

    if (loading) return <CirLoader />;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'processing':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'shipped':
                return <Truck className="w-4 h-4 text-blue-600" />;
            default:
                return <Package className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-50 text-green-700 border-green-100';
            case 'processing':
                return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'shipped':
                return 'bg-blue-50 text-blue-700 border-blue-100';
            default:
                return 'bg-gray-200 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-100 bg-gray-50/30 px-6 md:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {ordersList.length} {ordersList.length === 1 ? 'order' : 'orders'} placed
                        </p>
                    </div>
                    <Package className="w-8 h-8 text-gray-300" strokeWidth={1} />
                </div>
            </div>

            {/* Orders List */}
            <div className="p-6 md:p-8">
                {ordersList.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gray-100 rounded-full blur-2xl opacity-50"></div>
                            <div className="relative bg-gray-50 rounded-full p-6 border border-slate-300">
                                <Package className="w-12 h-12 text-gray-300" strokeWidth={1} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                            Looks like you haven't placed any orders. Start exploring our collection.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg"
                        >
                            Start Shopping
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {ordersList.map((order) => (
                            <div
                                key={order._id}
                                className="group border border-slate-300 rounded-xl shadow overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="bg-gray-50/30 px-5 py-4 border-b border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                                                <p className="text-sm font-medium text-gray-900 font-mono">
                                                    #{order._id.slice(-8).toUpperCase()}
                                                </p>
                                            </div>
                                            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wider">Placed on</p>
                                                <p className="text-sm text-gray-700 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</p>
                                                <p className="text-xl font-semibold text-gray-900">
                                                    ₹{order.total.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-5 py-4">
                                    <div className="space-y-2">
                                        {order.items.slice(0, 2).map((item: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between text-sm py-1">
                                                <div className="flex items-center gap-3 flex-1">
                                                    {item.product?.images?.[0] && (
                                                        <img
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            className="w-10 h-10 object-cover rounded bg-gray-50"
                                                        />
                                                    )}
                                                    <span className="text-gray-700 flex-1 line-clamp-1">
                                                        {item.product?.name || 'Product'}
                                                    </span>
                                                    <span className="text-gray-500">x{item.quantity}</span>
                                                </div>
                                                <span className="text-gray-900 font-medium ml-4">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-xs text-gray-400 pl-12">
                                                +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Order Footer */}
                                <div className="bg-gray-50/20 px-5 py-3 border-t border-gray-100 flex justify-end">
                                    <button
                                        onClick={() => {
                                            setShowOrderDetails(prev => !prev);
                                            setSelectedOrderId(order._id);
                                        }}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 group cursor-pointer"
                                    >
                                        View Order Details
                                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showOrderDetails && (
                <OrderDetails
                    orderId={selectedOrderId}
                    onClose={() => setShowOrderDetails(false)}
                />
            )}
        </div>
    );
}