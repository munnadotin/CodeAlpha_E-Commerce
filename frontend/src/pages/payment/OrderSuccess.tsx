import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import { CheckCircle, Package, Truck, MapPin, CreditCard, Calendar } from "lucide-react";

function OrderSuccess() {
    const { currentOrder } = useSelector((state: RootState) => state.orders);

    if (!currentOrder) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-light text-gray-900 mb-2">No Order Information</h2>
                    <p className="text-gray-400 mb-6">We couldn't find your order details.</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const orderDate = new Date(currentOrder.createdAt);
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(orderDate.getDate() + 5);

    const getStatusSteps = () => {
        const statuses = ['pending', 'processing', 'shipped', 'delivered'];
        const currentIndex = statuses.indexOf(currentOrder.status);

        return statuses.map((status, index) => ({
            name: status,
            completed: index <= currentIndex,
            current: index === currentIndex
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-500 mb-2">
                        Thank you for your purchase
                    </p>
                    <p className="text-sm text-gray-400">
                        Order #{currentOrder._id.slice(-8).toUpperCase()}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Order Status Timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-6">
                        Order Status
                    </h3>
                    <div className="relative">
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>
                        <div className="relative flex flex-col md:flex-row justify-between gap-4">
                            {getStatusSteps().map((step, idx) => (
                                <div key={step.name} className="flex md:flex-col items-center gap-3  md:gap-2 flex-1">
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${step.completed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        {step.completed ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <span className="text-sm font-medium">{idx + 1}</span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-sm font-medium capitalize ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.name}
                                        </p>
                                        {step.current && (
                                            <p className="text-xs text-gray-400 mt-1">Current</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            Order Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Order Date</span>
                                <span className="text-gray-900 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {orderDate.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total Amount</span>
                                <span className="text-lg font-semibold text-gray-900">
                                    ₹{currentOrder.total.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Payment Method</span>
                                <span className="text-gray-900 capitalize flex items-center gap-1">
                                    <CreditCard className="w-3 h-3" />
                                    {currentOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Payment Status</span>
                                <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${currentOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : currentOrder.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {currentOrder.paymentStatus}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Estimated Delivery</span>
                                <span className="text-gray-900 flex items-center gap-1">
                                    <Truck className="w-3 h-3" />
                                    {estimatedDelivery.toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            Shipping Address
                        </h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-900">{currentOrder.shoppingAddress?.city}</p>
                                <p className="mt-1">{currentOrder.shoppingAddress?.country}</p>
                                <p>{currentOrder.shoppingAddress?.city}, {currentOrder.shoppingAddress?.state} - {currentOrder.shoppingAddress?.zipCode}</p>
                                <p className="mt-1">Phone: {currentOrder.shoppingAddress?.street}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Items Ordered ({currentOrder.items.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {currentOrder.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        ₹{item.price.toLocaleString()} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link
                        to="/profile"
                        className="flex-1 text-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
                    >
                        View All Orders
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;