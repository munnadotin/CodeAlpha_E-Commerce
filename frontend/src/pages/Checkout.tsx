import { useState } from 'react';
import { CreditCard, MapPin, Banknote, Wallet } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import type { Address } from '../types/auth.type';
import { createCardOrderThunk, createOrderThunk } from '../api/orderThunk';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'cod' | 'upi';

function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('cod');
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (selectedPaymentMethod === "cod") {
      try {
        const res = await dispatch(createOrderThunk(selectedPaymentMethod)).unwrap();
        if (res?.data?._id) {
          navigate(`/checkout/order-success?orderId=${res.data._id}`);
        } else {
          navigate('/checkout/order-success');
        }
      } catch (error) {
        console.error('Error creating COD order:', error);
        navigate('/checkout/order-success');
      }
    } else {
      try {
        const res = await dispatch(createCardOrderThunk(selectedPaymentMethod)).unwrap();
        if (res?.data?.sessionUrl) {
          window.location.href = String(res.data.sessionUrl);
        } else if (res?.data?.order?._id) {
          navigate(`/checkout/order-success?orderId=${res.data.order._id}`);
        } else {
          navigate('/checkout/order-success');
        }
      } catch (error) {
        console.error('Error creating card order:', error);
        navigate('/checkout/order-success');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h1>

        <div className="space-y-6">
          {/* Address Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
              </div>
            </div>
            <div className="p-6">
              {user?.address.map((add: Address, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{add.street}</p>
                  <p className="text-gray-700">{add.city}, {add.state} - {add.zipCode}</p>
                  <p className="text-gray-700">{add.country}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-purple-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* COD Option */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${selectedPaymentMethod === 'cod'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedPaymentMethod === 'cod'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                </label>

                {/* UPI Option */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${selectedPaymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">UPI Payment</p>
                      <p className="text-xs text-gray-500">Google Pay, PhonePe, etc.</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Info Messages */}
              {selectedPaymentMethod === 'upi' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">You'll be redirected to complete UPI payment</p>
                </div>
              )}
              {selectedPaymentMethod === 'cod' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800">Pay at the time of delivery (No extra charges)</p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <div className="px-6 pb-6">
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/80 disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Checkout;