import React from 'react';

const MenuCard = ({ foodItem }) => {
  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Food Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Popular Badge */}
        {foodItem.isPopular && (
          <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
        {/* Vegetarian/Vegan Tags */}
        {foodItem.tags?.includes('vegetarian') && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            Vegetarian
          </div>
        )}
        {foodItem.tags?.includes('vegan') && (
          <div className="absolute top-2 right-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
            Vegan
          </div>
        )}
      </div>
      
      {/* Food Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{foodItem.name}</h3>
          <p className="text-lg font-bold text-pink-600">${foodItem.price.toFixed(2)}</p>
        </div>
        
        {/* Rating and Reviews */}
        <div className="mt-2 flex items-center">
          <div className="flex">
            {renderStars(foodItem.rating)}
            <span className="ml-1 text-sm text-gray-600">{foodItem.rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-500">{foodItem.reviewCount} reviews</span>
        </div>
        
        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {foodItem.description}
        </p>
        
        {/* Dietary Info */}
        {foodItem.dietaryInfo && (
          <div className="mt-3 flex flex-wrap gap-2">
            {foodItem.dietaryInfo.map((info, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {info}
              </span>
            ))}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Example usage:
// <MenuCard 
//   foodItem={{
//     name: "Margherita Pizza",
//     image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     price: 12.99,
//     rating: 4.5,
//     reviewCount: 128,
//     description: "Classic pizza with tomato sauce, fresh mozzarella, and basil. Our signature dish made with love.",
//     isPopular: true,
//     tags: ["vegetarian"],
//     dietaryInfo: ["Gluten-free option", "Dairy-free option"]
//   }} 
// />

export default MenuCard;