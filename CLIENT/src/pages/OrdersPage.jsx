import React from "react";
import UseFetch from "../hooks/UseFetch.jsx";

const OrdersPage = () => {
  const [data, isLoading, error] = UseFetch("/order/get/all");
  const orders = data?.orders || [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading orders...</p>
        </div>
      </div>
    );

  if (error) {
    console.error("Fetch Error:", error);
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">We couldn't load your orders</p>
          <p className="text-red-500 font-medium">{error.message || "Please try again later"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Order Dashboard</h1>
              <p className="text-gray-500 mt-2">Manage all customer orders in one place</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </div>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No orders yet</h3>
              <p className="mt-2 text-gray-500">When customers place orders, they'll appear here.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Order</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Restaurant</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Items</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order?._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order?._id?.substring(0, 8)}</div>
                        <div className="text-xs text-gray-500">...{order?._id?.substring(18, 24)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {order?.user?.name?.charAt(0) || "C"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order?.user?.name || "Customer"}</div>
                            <div className="text-xs text-gray-500">{order?.user?.email || "No email"}</div>
                            {order?.user?.phone && (
                              <div className="text-xs text-blue-500 mt-1">{order.user.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order?.restaurant?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">Restaurant</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-3">
                          {order?.cartId?.items?.map((item) => (
                            <div key={item?._id} className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  src={item?.foodImage || "https://via.placeholder.com/50"}
                                  alt={item?.foodName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{item?.foodName}</div>
                                <div className="text-xs text-gray-500">Qty: {item?.quantity}</div>
                                <div className="text-xs font-medium text-blue-600">₹{item?.totalItemPrice}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">₹{order?.finalPrice}</div>
                        <div className="text-xs text-gray-500">Total: ₹{order?.totalAmount}</div>
                        {order?.coupon && (
                          <div className="text-xs text-green-500">Saved ₹{order?.totalAmount - order?.finalPrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          order?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order?.status === "completed" || order?.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : order?.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {order?.status
                            ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                            : "Unknown"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order?.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order?.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;