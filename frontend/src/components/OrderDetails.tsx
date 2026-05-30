import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { getOrderByIdThunk } from "../api/orderThunk";
import CirLoader from "./Loader";
import { X, Package, MapPin, CreditCard, Calendar, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

type Props = {
    orderId: string;
    onClose: () => void;
}

function OrderDetails({ orderId, onClose }: Props) {
    const { currentOrder, loading } = useSelector((state: RootState) => state.orders);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrderByIdThunk(orderId));
    }, [orderId, dispatch]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    if (loading) return <CirLoader />;
    if (!currentOrder) return null;

    const orderDate = new Date(currentOrder.createdAt);
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(orderDate.getDate() + 5);

    const getStatusColor = () => {
        switch (currentOrder.status) {
            case 'delivered': return 'text-green-600 bg-green-50';
            case 'processing': return 'text-yellow-600 bg-yellow-50';
            case 'shipped': return 'text-blue-600 bg-blue-50';
            case 'cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = () => {
        switch (currentOrder.status) {
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'cancelled': return <AlertCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                            #{currentOrder._id.slice(-8).toUpperCase()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}>
                        {getStatusIcon()}
                        <span className="capitalize">{currentOrder.status}</span>
                    </div>

                    {/* Order Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">Order Date</p>
                                <p className="text-sm text-gray-900">
                                    {orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">Est. Delivery</p>
                                <p className="text-sm text-gray-900">
                                    {estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">Payment Method</p>
                                <p className="text-sm text-gray-900 uppercase">{currentOrder.paymentMethod}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">Payment Status</p>
                                <p className={`text-sm capitalize ${currentOrder.paymentStatus === 'paid' ? 'text-green-600' : currentOrder.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {currentOrder.paymentStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Shipping Address</p>
                                <p className="text-sm text-gray-900 font-medium">{currentOrder.shoppingAddress?.city}</p>
                                <p className="text-sm text-gray-600">{currentOrder.shoppingAddress?.country}</p>
                                <p className="text-sm text-gray-600">
                                    {currentOrder.shoppingAddress?.city}, {currentOrder.shoppingAddress?.state} - {currentOrder.shoppingAddress?.zipCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400 mb-3">Items ({currentOrder.items.length})</p>
                        <div className="space-y-3">
                            {currentOrder.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        <p className="text-xs text-gray-400">₹{item.price.toLocaleString()} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Amount</span>
                            <span className="text-xl font-bold text-gray-900">₹{currentOrder.total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;