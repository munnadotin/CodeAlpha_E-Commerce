import { useEffect, useState } from "react";
import type { OrdersType } from "../types/orders.type";
import { X, Package, CreditCard } from "lucide-react";
import { getAdminOrdersThunk, updateOrdersThunk } from "../api/orderThunk";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

type Props = {
    onClose: () => void;
    update: { value: string; label: string }[];
    order: OrdersType;
    onUpdateStatus?: (orderId: string, status: string) => void;
    onUpdatePaymentStatus?: (orderId: string, paymentStatus: string) => void;
}

function UpdateOrder({ onClose, update, order, onUpdateStatus, onUpdatePaymentStatus }: Props) {
    const [selectedStatus, setSelectedStatus] = useState(order.status);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(order.paymentStatus);
    const [updating, setUpdating] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const paymentStatusOptions = [
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "failed", label: "Failed" }
    ];

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            if (selectedStatus !== order.status && onUpdateStatus) {
                await onUpdateStatus(order._id, selectedStatus);
            }
            if (selectedPaymentStatus !== order.paymentStatus && onUpdatePaymentStatus) {
                await onUpdatePaymentStatus(order._id, selectedPaymentStatus);
            }
            await dispatch(updateOrdersThunk({ data: { status: selectedStatus as any, paymentStatus: selectedPaymentStatus as any }, orderId: order._id }));
            await dispatch(getAdminOrdersThunk());
            onClose();
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'text-green-600';
            case 'processing': return 'text-yellow-600';
            case 'shipped': return 'text-blue-600';
            case 'cancelled': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Update Order</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Order ID</p>
                        <p className="text-sm font-mono text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>

                    {/* Order Status */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-gray-400" />
                            <h3 className="text-sm font-medium text-gray-900">Order Status</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {update.map((item) => (
                                <label
                                    key={item.value}
                                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${item.value === "all" ? "hidden" : ""} ${selectedStatus === item.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={item.value}
                                        checked={selectedStatus === item.value}
                                        onChange={(e) => setSelectedStatus(e.target.value as any)}
                                        className="w-3 h-3"
                                    />
                                    <span className={`text-sm capitalize ${selectedStatus === item.value ? getStatusColor(item.value) : 'text-gray-600'}`}>
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <h3 className="text-sm font-medium text-gray-900">Payment Status</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {paymentStatusOptions.map((item) => (
                                <label
                                    key={item.value}
                                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${selectedPaymentStatus === item.value
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value={item.value}
                                        checked={selectedPaymentStatus === item.value}
                                        onChange={(e) => setSelectedPaymentStatus(e.target.value as any)}
                                        className="w-3 h-3"
                                    />
                                    <span className={`text-sm capitalize ${selectedPaymentStatus === item.value
                                        ? item.value === 'paid'
                                            ? 'text-green-600'
                                            : item.value === 'failed'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                        : 'text-gray-600'
                                        }`}>
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Current Payment Method */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                        <p className="text-sm text-gray-900 capitalize">{order.paymentMethod}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={updating || (selectedStatus === order.status && selectedPaymentStatus === order.paymentStatus)}
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updating ? "Updating..." : "Update Order"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateOrder;