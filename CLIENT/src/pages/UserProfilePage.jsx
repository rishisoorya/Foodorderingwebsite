import React from 'react';
import { Link } from "react-router-dom";
import UseFetch from '../hooks/UseFetch.jsx';
import { motion } from 'framer-motion';

export default function UserProfilePage() {
  const [userData, isUserLoading, userError] = UseFetch("/user/profile");
  const [addressData, isAddressLoading, addressError] = UseFetch("/address/get/getAllAddress");
  const [ordersData, isOrdersLoading, ordersError] = UseFetch("/order/get/all");

  const profile = userData?.user || {};
  const address = addressData?.address || null;
  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];

  if (isUserLoading || isAddressLoading || isOrdersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (userError || addressError || ordersError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading user data. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Link 
            to="/pages/UpdateProfilePage" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Section */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src={profile.profilePic || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{profile.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{profile.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{profile.phone || 'Not provided'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Address Section */}
        {address ? (
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Default Address</h2>
              <Link 
                to="/pages/UpdateAddressPage"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Address
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Recipient Name</p>
                <p className="font-medium text-gray-900">{address.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium text-gray-900">{address.phone}</p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-sm text-gray-500">Delivery Address</p>
                <div className="font-medium text-gray-900 space-y-1">
                  <p>{address.houseName}, {address.streetName}</p>
                  <p>{address.landmark}, {address.city}</p>
                  <p>{address.state} - {address.pincode}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No address saved</h3>
              <p className="mt-1 text-sm text-gray-500">Add your delivery address for faster checkout.</p>
              <div className="mt-6">
                <Link 
                  to="/pages/AddAddressPage"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Address
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order History</h2>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">Your order history will appear here.</p>
              <div className="mt-6">
                <Link 
                  to="/restaurants"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Restaurants
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div 
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={order.restaurant?.image || "https://via.placeholder.com/150"} 
                          alt={order.restaurant?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-gray-900">{order.restaurant?.name}</p>
                    </div>
                    <ul className="space-y-3">
                      {order.cartId.items.map(item => (
                        <li key={item._id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2 text-sm">{item.quantity}x</span>
                            <span className="text-gray-900">{item.foodName}</span>
                          </div>
                          <span className="font-medium">₹{item.totalItemPrice.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                    {order.coupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({order.coupon.discountPercentage}%):</span>
                        <span>-₹{(order.totalAmount - order.finalPrice).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Paid:</span>
                      <span>₹{order.finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}