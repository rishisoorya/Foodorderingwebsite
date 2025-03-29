// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiFrown, FiHome, FiSearch } from 'react-icons/fi';

// const ErrorPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center p-6">
//       {/* Animated Container */}
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
//         {/* Decorative Header */}
//         <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center">
//           <div className="flex justify-center mb-4">
//             <FiFrown className="h-16 w-16 text-white opacity-90" />
//           </div>
//           <h1 className="text-4xl font-bold text-white">404</h1>
//           <p className="mt-2 text-pink-100 text-lg">Oops! Page not found</p>
//         </div>

//         {/* Content */}
//         <div className="p-8 text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Lost your appetite?</h2>
//           <p className="text-gray-600 mb-6">
//             The page you're looking for doesn't exist or has been moved. 
//             Let's get you back to discovering delicious food!
//           </p>

//           {/* Food Illustration */}
//           <div className="flex justify-center mb-8">
//             <div className="relative h-32 w-32">
//               <div className="absolute top-0 left-0 h-16 w-16 bg-yellow-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
//               <div className="absolute top-4 right-4 h-12 w-12 bg-red-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
//               <div className="absolute bottom-4 left-4 h-14 w-14 bg-green-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//               <div className="absolute bottom-0 right-0 h-10 w-10 bg-blue-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               to="/"
//               className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
//             >
//               <FiHome className="mr-2" />
//               Go Home
//             </Link>
//             <Link
//               to="/search"
//               className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
//             >
//               <FiSearch className="mr-2" />
//               Search Food
//             </Link>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-8 py-4 bg-gray-50 text-center">
//           <p className="text-sm text-gray-500">
//             Need help?{' '}
//             <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
//               Contact support
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Floating Food Icons */}
//       <div className="hidden md:block fixed -bottom-20 -left-20 h-40 w-40 bg-yellow-100 rounded-full opacity-20"></div>
//       <div className="hidden md:block fixed -top-20 -right-20 h-64 w-64 bg-purple-100 rounded-full opacity-20"></div>
//       <div className="hidden md:block fixed top-1/4 -right-10 h-32 w-32 bg-pink-100 rounded-full opacity-20"></div>
//       <div className="hidden md:block fixed bottom-1/4 -left-10 h-24 w-24 bg-green-100 rounded-full opacity-20"></div>
//     </div>
//   );
// };

// export default ErrorPage;