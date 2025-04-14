import React from "react";

function RestaurantHomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-pink-700 mb-6">
          Welcome to Your Restaurant Dashboard
        </h1>
        
        <p className="text-lg text-pink-600 mb-8">
          Manage your menu, track orders, and grow your business with our intuitive control panel
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors duration-300">
            Learn More
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-pink-600 text-2xl mb-2">🍔</div>
            <h3 className="font-semibold text-pink-700">Menu Management</h3>
            <p className="text-sm text-pink-500">Create and update your offerings</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-pink-600 text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-pink-700">Order Tracking</h3>
            <p className="text-sm text-pink-500">Monitor incoming orders</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-pink-600 text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-pink-700">Revenue Insights</h3>
            <p className="text-sm text-pink-500">Track your earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantHomePage;