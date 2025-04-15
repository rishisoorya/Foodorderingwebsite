// import React from 'react';

// const DiscountListing = () => {
//   // Sample discount data
//   const discounts = [
//     {
//       id: 1,
//       code: 'FOODIE20',
//       title: '20% Off Your First Order',
//       description: 'Get 20% off on your first order above $20',
//       validUntil: '2023-12-31',
//       minOrder: 20,
//       discountType: 'percentage',
//       discountValue: 20,
//       isActive: true,
//       restaurantSpecific: false
//     },
//     {
//       id: 2,
//       code: 'FREEDEL',
//       title: 'Free Delivery',
//       description: 'Free delivery on all orders this weekend',
//       validUntil: '2023-11-15',
//       minOrder: 15,
//       discountType: 'delivery',
//       discountValue: 100,
//       isActive: true,
//       restaurantSpecific: true,
//       restaurantName: 'Burger King'
//     },
//     {
//       id: 3,
//       code: 'SAVE10',
//       title: '$10 Off Large Orders',
//       description: 'Get $10 off on orders above $50',
//       validUntil: '2023-12-15',
//       minOrder: 50,
//       discountType: 'fixed',
//       discountValue: 10,
//       isActive: true,
//       restaurantSpecific: false
//     },
//     {
//       id: 4,
//       code: 'COMBO30',
//       title: '30% Off Combos',
//       description: '30% off on all combo meals',
//       validUntil: '2023-11-30',
//       minOrder: 0,
//       discountType: 'percentage',
//       discountValue: 30,
//       isActive: true,
//       restaurantSpecific: true,
//       restaurantName: 'Pizza Heaven'
//     }
//   ];

//   // Function to calculate days remaining
//   const getDaysRemaining = (date) => {
//     const today = new Date();
//     const validDate = new Date(date);
//     const diffTime = validDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? `${diffDays} days left` : 'Expired';
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Discounts & Offers</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {discounts.map((discount) => (
//           <div 
//             key={discount.id}
//             className={`relative bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
//               discount.discountType === 'percentage' ? 'border-pink-500' : 
//               discount.discountType === 'fixed' ? 'border-purple-500' : 'border-green-500'
//             }`}
//           >
//             {/* Discount Badge */}
//             <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
//               discount.discountType === 'percentage' ? 'bg-pink-100 text-pink-800' : 
//               discount.discountType === 'fixed' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
//             }`}>
//               {discount.discountType === 'percentage' ? `${discount.discountValue}% OFF` : 
//                discount.discountType === 'fixed' ? `$${discount.discountValue} OFF` : 'FREE DELIVERY'}
//             </div>
            
//             <div className="p-6">
//               <div className="flex items-start">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-900">{discount.title}</h3>
//                   <p className="mt-1 text-sm text-gray-600">{discount.description}</p>
                  
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {discount.restaurantSpecific && (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {discount.restaurantName}
//                       </span>
//                     )}
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       Min order: ${discount.minOrder}
//                     </span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-