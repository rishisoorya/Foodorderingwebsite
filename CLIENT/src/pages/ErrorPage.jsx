import React from 'react';
import { Link } from 'react-router-dom';
import { FiFrown, FiHome, FiMail } from 'react-icons/fi';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6">
      {/* Main Container */}
      <div className="max-w-md w-full bg-gray-850 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transition-all duration-500 hover:shadow-3xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-center border-b border-gray-700">
          <div className="flex justify-center mb-4">
            <FiFrown className="h-16 w-16 text-gray-300 opacity-90" />
          </div>
          <h1 className="text-4xl font-bold text-white">404</h1>
          <p className="mt-2 text-gray-400 text-lg">Page Not Found</p>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">Looking for something?</h2>
          <p className="text-gray-400 mb-8">
            The requested page doesn't exist or may have been moved.
          </p>

          {/* Abstract Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative h-32 w-32">
              <div className="absolute top-0 left-0 h-16 w-16 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-4 right-4 h-12 w-12 bg-indigo-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-4 left-4 h-14 w-14 bg-purple-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-0 right-0 h-10 w-10 bg-gray-600 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Single Action Button */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
            >
              <FiHome className="mr-2" />
              Return Home
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-8 py-4 bg-gray-800 text-center border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Need assistance?{' '}
            <a href="mailto:support@example.com" className="font-medium text-blue-400 hover:text-blue-300 flex items-center justify-center">
              <FiMail className="mr-1" /> Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="hidden md:block fixed -bottom-20 -left-20 h-40 w-40 bg-gray-800 rounded-full opacity-10"></div>
      <div className="hidden md:block fixed -top-20 -right-20 h-64 w-64 bg-gray-800 rounded-full opacity-10"></div>
      <div className="hidden md:block fixed top-1/4 -right-10 h-32 w-32 bg-gray-800 rounded-full opacity-10"></div>
      <div className="hidden md:block fixed bottom-1/4 -left-10 h-24 w-24 bg-gray-800 rounded-full opacity-10"></div>
    </div>
  );
};

export default ErrorPage;