import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance.js'; // Adjust the import path as needed

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
      <div className="flex justify-center items-center h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-500 py-4 px-6">
          <h1 className="text-white text-2xl font-bold">Payment</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h2>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Restaurant:</span>
                <span className="font-medium">{order.restaurant.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{order._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Items</h2>
            <div className="border rounded-lg divide-y">
              {order.cartId.items.map((item, index) => (
                <div key={index} className="p-3 flex justify-between">
                  <div>
                    <p className="font-medium">{item.foodName}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{(item.totalItemPrice) .toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{(order.totalAmount ).toFixed(2)}</span>
            </div>
            {order.coupon && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium text-green-600">
                  -₹{((order.totalAmount - order.finalPrice) ).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>₹{(order.finalPrice).toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Delivery Address</h2>
            <div className="border rounded-lg p-4">
              <p className="capitalize">{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={showLoader}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white ${showLoader ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {showLoader ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;