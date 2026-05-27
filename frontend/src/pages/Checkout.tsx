import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useState } from "react";
import { createCardOrderThunk, createOrderThunk } from "../api/orderThunk";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const addresses = user?.address || [];
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.orders);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (paymentMethod === "upi") {
      // Handle UPI payment
      const res = await dispatch(createCardOrderThunk(paymentMethod as 'upi')).unwrap();
      window.location.href = res?.data;
    } else {
      await dispatch(createOrderThunk(paymentMethod as 'cod'));
      // Redirect to order confirmation or success page
      navigate("/checkout/order-success");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Address</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses found</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr: any, idx: number) => (
              <div key={idx} className="border rounded-lg p-3">
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} - {addr.zipCode}</p>
                <p>{addr.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery (COD)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>UPI (Google Pay, PhonePe, etc.)</span>
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      {loading ? (
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-not-allowed"
        >
          Placing Order...
        </button>
      ) : (
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      )
      }
    </div >
  );
}

export default Checkout;