import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
];

function RestaurantOrdersPage() {
  const [data, isLoading, error, refetch] = useFetch("/order/restaurant-order");
  const [statusMap, setStatusMap] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateOrder = async (order) => {
    const selectedStatus = statusMap[order._id] || order.status;
    try {
      const res = await axiosInstance.put(`/order/update/status/${order._id}`, {
        status: selectedStatus,
        deliveryAddress: order.deliveryAddress?._id,
      });
      toast.success(res.data?.message || "Status updated");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-8 text-red-500 text-lg">
      {error?.message || "Something went wrong while fetching orders."}
    </div>
  );
  
  if (!data || !data.orders || data.orders.length === 0) return (
    <div className="text-center py-8 text-gray-500 text-lg">
      No orders found.
    </div>
  );

  const activeOrders = data.orders.filter(
    (order) => order.status && order.status !== "delivered"
  );
  const deliveredOrders = data.orders.filter(
    (order) => order.status && order.status === "delivered"
  );

  const renderOrderCard = (order, isDelivered = false) => (
    <div
      key={order._id}
      className={`border border-pink-100 rounded-xl shadow-lg p-6 mb-6 ${
        isDelivered ? "bg-pink-50" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-pink-800">
            Order #{order.orderId}
          </h2>
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <p className="text-sm font-medium text-pink-700">
              Status: <span className="capitalize">{order.status}</span>
            </p>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Customer:</span> {order.user?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {order.user?.phone || "N/A"}
          </p>
        </div>
      </div>

      {!isDelivered && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <select
            value={statusMap[order._id] || order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="border border-pink-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => updateOrder(order)}
            className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-pink-700 hover:to-pink-600 shadow-md hover:shadow-lg transition-all"
          >
            Update Status
          </button>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pink-800 mb-3">Order Items</h3>
        <div className="space-y-4">
          {order.cartId?.items?.map((item) => (
            <div key={item._id} className="flex gap-4 items-start p-3 bg-pink-50 rounded-lg">
              <img
                src={item.foodImage}
                alt={item.foodName}
                className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-medium text-pink-800">{item.foodName}</h3>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium text-pink-700">
                    ₹{item.totalItemPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h4 className="font-medium text-pink-700 mb-2">Delivery Address</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>{order.deliveryAddress?.street || "N/A"}</p>
            <p>{order.deliveryAddress?.city || "N/A"}, {order.deliveryAddress?.state || "N/A"}</p>
            <p>Phone: {order.deliveryAddress?.phone || "N/A"}</p>
          </div>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h4 className="font-medium text-pink-700 mb-2">Payment Summary</h4>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.totalAmount || 0}</span>
            </div>
            {order.coupon?.code && (
              <div className="flex justify-between">
                <span>Coupon ({order.coupon.code}):</span>
                <span className="text-green-600">-₹{(order.totalAmount - (order.finalPrice || 0)).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium border-t border-pink-200 pt-2 mt-2">
              <span>Total:</span>
              <span className="text-pink-700">₹{order.finalPrice || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-800">Active Orders</h1>
          <div className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            {activeOrders.length} {activeOrders.length === 1 ? "order" : "orders"}
          </div>
        </div>
        
        {activeOrders.length > 0 ? (
          <div className="space-y-6">
            {activeOrders.map((order) => renderOrderCard(order))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-pink-100">
            <p className="text-gray-500 text-lg">No active orders at the moment</p>
          </div>
        )}
      </div>

      <div className="text-center my-8">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-pink-700 hover:to-pink-600 shadow-md hover:shadow-lg transition-all"
        >
          {showHistory ? "Hide Order History" : `Show Order History (${deliveredOrders.length})`}
        </button>
      </div>

      {showHistory && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-pink-800">Order History</h1>
            <div className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
              {deliveredOrders.length} {deliveredOrders.length === 1 ? "order" : "orders"}
            </div>
          </div>
          
          {deliveredOrders.length > 0 ? (
            <div className="space-y-6">
              {deliveredOrders.map((order) => renderOrderCard(order, true))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-pink-100">
              <p className="text-gray-500 text-lg">No order history yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantOrdersPage;