import React from "react";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" 
         style={{ 
           backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundAttachment: "fixed"
         }}>
      {/* Header */}
      <header className="bg-white bg-opacity-90 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-start items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 9v6l-6 3.5-6-3.5V9l6-4.5z" />
              <path d="M12 16.5l6-3.5V9l-6 3.5-6-3.5v4l6 3.5z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">FoodPanda Admin</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center space-y-6 bg-white bg-opacity-95 p-10 rounded-xl shadow-xl backdrop-blur-sm">
          <div className="inline-flex items-center justify-center bg-pink-100 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Welcome to <span className="text-pink-600">FoodPanda</span> Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Monitor real-time orders, manage restaurant partners, and track deliveries from your admin panel.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-90 py-4 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2023 FoodPanda Admin. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-pink-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;