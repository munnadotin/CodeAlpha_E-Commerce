import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../app/store"
import { useEffect, useState } from "react";
import { getAdminOrdersThunk } from "../../api/orderThunk";
import { Package, Eye, Calendar, Truck, CheckCircle, Clock, AlertCircle, Edit } from "lucide-react";
import OrderDetails from "../../components/OrderDetails";
import CirLoader from "../../components/Loader";
import type { OrdersType } from "../../types/orders.type";
import UpdateOrder from "../../components/UpdateOrder";

function Orders() {
  const { ordersList, loading } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOrder, setSelectedOrder] = useState<null | OrdersType>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updateOrder, setUpdateOrder] = useState<null | OrdersType>(null);

  useEffect(() => {
    dispatch(getAdminOrdersThunk());
  }, [dispatch]);

  const filteredOrders = statusFilter === "all"
    ? ordersList
    : ordersList?.filter(order => order.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 text-green-700';
      case 'processing': return 'bg-yellow-50 text-yellow-700';
      case 'shipped': return 'bg-blue-50 text-blue-700';
      case 'cancelled': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-3 h-3" />;
      case 'processing': return <Clock className="w-3 h-3" />;
      case 'shipped': return <Truck className="w-3 h-3" />;
      case 'cancelled': return <AlertCircle className="w-3 h-3" />;
      default: return <Package className="w-3 h-3" />;
    }
  };

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  if (loading) return <CirLoader />;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50/30 px-6 md:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
              <p className="text-sm text-gray-400 mt-1">
                {filteredOrders?.length || 0} total orders
              </p>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 bg-white"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-100">
          {filteredOrders?.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            filteredOrders?.map((order) => (
              <div key={order._id} className="p-6 md:p-8 hover:bg-gray-50/30 transition">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                    <span className={`text-sm font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : order.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">Items ({order.items.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item: any, idx: number) => (
                      <span key={idx} className="text-sm text-gray-600">
                        {item.name}
                        {idx < Math.min(2, order.items.length - 1) && ","}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-sm text-gray-400">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400">Payment:</span>
                    <span className={`capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : order.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {order.paymentStatus}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400 capitalize">{order.paymentMethod}</span>
                  </div>

                  <button
                    onClick={() => setUpdateOrder(order)}
                    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
                  >
                    Update Order
                    <Edit className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
                  >
                    View Details
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          orderId={selectedOrder._id}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Update order */}
      {updateOrder && (
        <UpdateOrder
          update={statusOptions}
          order={updateOrder}
          onClose={() => setUpdateOrder(null)}
        />
      )}
    </>
  );
}

export default Orders;