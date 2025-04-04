import React from 'react';
import { Link } from "react-router-dom";
import UseFetch from '../hooks/UseFetch.jsx';

export default function UserProfilePage() {
  const [userData, isUserLoading, userError] = UseFetch("/user/profile");
  const [addressData, isAddressLoading, addressError] = UseFetch("/address/get/getAllAddress");
  const [ordersData, isOrdersLoading, ordersError] = UseFetch("/order/get/all");

  const profile = userData?.user || {};
  const address = addressData?.address || null;
  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];

  if (isUserLoading || isAddressLoading || isOrdersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (userError || addressError || ordersError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>Error loading user data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Account
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your profile, addresses, and orders
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={profile.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg font-medium text-gray-900">{profile.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-lg font-medium text-gray-900">{profile.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Link 
                to="/pages/UpdateProfilePage" 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Address Section */}
        {address && (
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Default Address</h2>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Contact Name</label>
                  <p className="text-lg font-medium text-gray-900">{address.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Contact Phone</label>
                  <p className="text-lg font-medium text-gray-900">{address.phone}</p>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg font-medium text-gray-900">
                    {address.houseName}, {address.streetName}
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {address.landmark}, {address.city}
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {address.state} - {address.pincode}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Link 
                  to="/pages/UpdateAddressPage"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Address
                </Link>
                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add New Address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order History</h2>
          </div>
          <div className="px-6 py-5">
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-gray-500">Your order history will appear here once you start shopping.</p>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className={`mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="mb-5">
                      <p className="font-medium text-gray-900 mb-3">Restaurant: {order.restaurant.name}</p>
                      <ul className="divide-y divide-gray-200">
                        {order.cartId.items.map(item => (
                          <li key={item._id} className="py-3 flex justify-between">
                            <div className="flex items-center">
                              <span className="text-gray-900 font-medium">{item.quantity} × {item.foodName}</span>
                            </div>
                            <span className="text-gray-900 font-medium">₹{item.totalItemPrice.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900 font-medium">₹{order.totalAmount.toFixed(2)}</span>
                      </div>
                      {order.coupon && (
                        <div className="flex justify-between mb-2 text-green-600">
                          <span>Discount ({order.coupon.discountPercentage}%):</span>
                          <span>-₹{(order.totalAmount - order.finalPrice).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>₹{order.finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                     
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}