import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseFetch from "../hooks/UseFetch.jsx";

export default function UserProfilePage() {
  const [userData, isUserLoading, userError] = UseFetch("/user/profile");
  const [addressData, isAddressLoading, addressError] = UseFetch("/address/get/getAllAddress");
  const [ordersData, isOrdersLoading, ordersError] = UseFetch("/order/get/all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const profile = userData?.user || {};
  const address = addressData?.address || null;
  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];

  if (isUserLoading || isAddressLoading || isOrdersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-pink-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-16 0 9 9 0 0116 0z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h3>
          <p className="text-gray-600 mb-6">{userError.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const calculateDiscount = (order) => {
    if (!order?.coupon || !order?.totalAmount || !order?.finalPrice) return "0.00";
    return (order.totalAmount - order.finalPrice).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3">
            Welcome Back, <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{profile.name?.split(' ')[0] || 'User'}</span>
          </h1>
          <p className="text-xl text-gray-600">Manage your account and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-32 flex items-end justify-center pb-8">
                <div className="relative">
                  <div className="absolute -inset-2 bg-white rounded-full opacity-20"></div>
                  <div className="relative h-24 w-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src={profile.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 pt-16 pb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name || "N/A"}</h2>
                <p className="text-gray-600 mt-1">{profile.email || "N/A"}</p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{profile.phone || "Not provided"}</span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">
                      Member since {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {address ? (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Default Address</h3>
                  <Link
                    to="/pages/UpdateAddressPage"
                    className="text-pink-600 hover:text-pink-700 flex items-center font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{address.name || "N/A"}</p>
                      <p className="text-gray-600">{address.phone || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{address.houseName || "N/A"}, {address.streetName || "N/A"}</p>
                      <p className="text-gray-600">{address.landmark || "N/A"}, {address.city || "N/A"}</p>
                      <p className="text-gray-600">{address.state || "N/A"} - {address.pincode || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No Address Saved</h3>
                <p className="text-gray-600 mb-6">Add an address for faster checkout</p>
                <Link
                  to="/pages/UpdateAddressPage"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all shadow-md font-medium"
                >
                  Add Address
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 bg-gradient-to-r from-pink-500 to-purple-600">
                <h2 className="text-2xl font-bold text-white">Your Orders</h2>
              </div>
              
              <div className="p-6">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id || Math.random().toString(36).substring(2, 9)} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleOrder(order._id)}
                          className="w-full p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className="text-left">
                            <p className="text-lg font-bold text-gray-900">
                              Order #{order._id?.slice(-6).toUpperCase() || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`mr-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {order.status
                                ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                                : "N/A"}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                expandedOrder === order._id ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </button>

                        {expandedOrder === order._id && (
                          <div className="px-5 pb-5 pt-2 border-t border-gray-200">
                            <div className="mb-4">
                              <p className="font-bold text-gray-900 mb-3">{order.restaurant?.name || "N/A"}</p>
                              
                              <ul className="divide-y divide-gray-200">
                                {Array.isArray(order.cartId?.items) && order.cartId.items.length > 0 ? (
                                  order.cartId.items.map((item) => (
                                    <li key={item._id || Math.random().toString(36).substring(2, 9)} className="py-3 flex justify-between">
                                      <span className="text-gray-900">
                                        {item.quantity || 0} × {item.foodName || "Unknown Item"}
                                      </span>
                                      <span className="text-gray-900 font-medium">
                                        ₹{item.totalItemPrice?.toFixed(2) || "0.00"}
                                      </span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="py-3 text-gray-500">No items in this order</li>
                                )}
                              </ul>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                              {order.coupon && (
                                <div className="flex justify-between mb-2 text-green-600">
                                  <span>Discount ({order.coupon.discountPercentage || 0}%)</span>
                                  <span>-₹{calculateDiscount(order)}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{order.finalPrice?.toFixed(2) || "0.00"}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Your order history will appear here once you start shopping</p>
                    <Link
                      to="/"
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
                    >
                      Browse Restaurants
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}