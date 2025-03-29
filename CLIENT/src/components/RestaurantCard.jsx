import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
          <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Delivery Time */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-md text-sm font-medium">
          {restaurant.deliveryTime} min
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 truncate">{restaurant.name}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
            <span className="text-sm font-semibold text-gray-900 mr-1">{restaurant.rating}</span>
            {renderStars(restaurant.rating)}
          </div>
        </div>
        
        {/* Cuisine Type */}
        <p className="text-gray-600 text-sm mt-1 truncate">
          {restaurant.cuisine.join(', ')}
        </p>
        
        {/* Price Range */}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {restaurant.priceRange}
          </p>
          <div className="flex items-center">
            {restaurant.isPromoted && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                Promoted
              </span>
            )}
            {restaurant.isOpen ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                Open Now
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                Closed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage:
// <RestaurantCard 
//   restaurant={{
//     name: "Gourmet Paradise",
//     image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     rating: 4.5,
//     cuisine: ["Italian", "Mediterranean"],
//     deliveryTime: 25,
//     priceRange: "$$$",
//     isPromoted: true,
//     isOpen: true
//   }} 
// />

export default RestaurantCard;