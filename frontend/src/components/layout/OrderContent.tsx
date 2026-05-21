import { Link } from "react-router-dom";

export default function OrderContent() {
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-05-15',
            status: 'Delivered',
            total: 299.99,
            items: [
                { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
                { name: 'Phone Case', quantity: 2, price: 49.99 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-05-10',
            status: 'Processing',
            total: 149.99,
            items: [
                { name: 'Smart Watch', quantity: 1, price: 149.99 }
            ]
        },
        {
            id: 'ORD-003',
            date: '2024-05-01',
            status: 'Shipped',
            total: 89.99,
            items: [
                { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
            ]
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-gray-500">No orders yet</p>
                    <Link to="/shop" className="inline-block mt-4 text-gray-900 hover:underline">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                        <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
