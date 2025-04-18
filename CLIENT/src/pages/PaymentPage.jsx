import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance.js';

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/order/get/all")
      .then(response => {
        if (response.data.orders.length > 0) {
          setOrder(response.data.orders[0]);
        }
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  const handlePayment = async () => {
    if (!order) return;
  
    try {
      setShowLoader(true);
      const { data } = await axiosInstance.post(`/payment/create/${order._id}`);
  
      if (!data || !data.razorpayOrder) {
        console.error("Failed to initiate payment");
        setShowLoader(false);
        return;
      }
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, 
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: order.restaurant.name,
        description: `Order #${order._id}`,
        image: "https://res.cloudinary.com/dutf0dgga/image/upload/v1743753496/Vite_React_-_Brave_04-04-2025_13_22_49_zophtd.png",
        order_id: data.razorpayOrder.id, 
        handler: async function (response) {
          try {
            const verifyResponse = await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            alert(verifyResponse.data.message);
            setShowLoader(true);
            setTimeout(() => {
              navigate("/");
            }, 4000);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed!");
            setShowLoader(false);
          }
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
          contact: order.user.phone,
        },
        theme: {
          color: "#F37254",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
      setShowLoader(false);
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment. Please try again.");
      setShowLoader(false);
    }
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-pink-700">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-6 px-8">
            <h1 className="text-2xl font-bold text-white">Complete Your Payment</h1>
            <p className="text-pink-100 mt-1">Order #{order._id.slice(-6).toUpperCase()}</p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">{order.restaurant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Items</h2>
              <div className="divide-y divide-gray-200">
                {order.cartId.items.map((item, index) => (
                  <div key={index} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.foodName}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.totalItemPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                {order.coupon && (
                  <div className="flex justify-between mb-3 text-green-600">
                    <span>Discount ({order.coupon.discountPercentage}%)</span>
                    <span>-₹{(order.totalAmount - order.finalPrice).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-lg font-bold">₹{order.finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="font-medium text-gray-900">{order.deliveryAddress.name}</p>
                <p className="text-gray-600">{order.deliveryAddress.houseName}, {order.deliveryAddress.streetName}</p>
                {order.deliveryAddress.landmark && <p className="text-gray-600">{order.deliveryAddress.landmark}</p>}
                <p className="text-gray-600">{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                <p className="text-gray-600 mt-2">Phone: {order.deliveryAddress.phone}</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={showLoader}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-colors ${
                showLoader ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600'
              }`}
            >
              {showLoader ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;