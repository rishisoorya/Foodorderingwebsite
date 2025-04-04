import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantListingPage = () => {
  // Restaurant data from the provided JSON
  const [restaurants] = useState([
    {
      _id: "67ede6a18ffd20ec3cd843b8",
      name: "Pepper House",
      email: "PepperHouse@gmail.com",
      phone: "+917894561232",
      image: "http://res.cloudinary.com/dutf0dgga/image/upload/v1743704400/p0xekbqzjtmuvpdr33nz.jpg",
      openStatus: true,
      password: "$2b$10$PCJCC9VxcFKFldaVnSIjk.9FQPexuInThAsQjpVLeP9d0GC4x/E16",
      isVerified: true,
      menu: [],
      createdAt: "2025-04-03T01:38:41.112Z",
      updatedAt: "2025-04-03T01:38:41.112Z",
      __v: 0,
      // Adding some additional fields for filtering
      rating: 4.2,
      cuisine: ["Chinese", "Asian"],
      deliveryTime: 30,
      priceRange: "$$"
    },
    {
      _id: "67ede6df8ffd20ec3cd843bc",
      name: "Malabar Cafe",
      email: "MalabarCafe@gmail.com",
      phone: "+917894561231",
      image: "http://res.cloudinary.com/dutf0dgga/image/upload/v1743704540/jeyx67hxppaktgygbboy.jpg",
      openStatus: true,
      password: "$2b$10$mJTEr9Ako.TP1UWWjxtueuGs3kZ.UN.VVD57qYlAy/c.FYDgr9.V6",
      isVerified: true,
      menu: [],
      createdAt: "2025-04-03T01:39:43.213Z",
      updatedAt: "2025-04-03T01:39:43.213Z",
      __v: 0,
      // Adding some additional fields for filtering
      rating: 3.9,
      cuisine: ["Chinese", "Fast Food"],
      deliveryTime: 25,
      priceRange: "$"
    },
    {
      _id: "67ede7018ffd20ec3cd843bf",
      name: "Latest Recipe",
      email: "Latest Recipe@gmail.com",
      phone: "+917894561236",
      image: "http://res.cloudinary.com/dutf0dgga/image/upload/v1743706785/eah1aqftt2xwiyd50fh2.jpg",
      openStatus: true,
      password: "$2b$10$1ksOfgCoztM7EgK.o7mVLeoIBNG.DG.JkO0ZUKqoxLs7zmVdmJEYu",
      isVerified: true,
      menu: [],
      createdAt: "2025-04-03T01:40:17.455Z",
      updatedAt: "2025-04-03T01:40:17.455Z",
      __v: 0,
      // Adding some additional fields for filtering
      rating: 4.5,
      cuisine: ["Chinese", "Sushi"],
      deliveryTime: 35,
      priceRange: "$$$"
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState('all');
  const [openNow, setOpenNow] = useState(false);

  // Filter restaurants based on criteria
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (restaurant.cuisine && restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesRating = restaurant.rating >= minRating;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && restaurant.priceRange.length <= 1) ||
                        (priceFilter === 'medium' && restaurant.priceRange.length === 2) ||
                        (priceFilter === 'high' && restaurant.priceRange.length >= 3);
    const matchesOpenStatus = !openNow || restaurant.openStatus;
    
    return matchesSearch && matchesRating && matchesPrice && matchesOpenStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Discover Amazing Restaurants
          </h1>
          <p className="mt-3 text-xl text-pink-100">
            Order from your favorite local restaurants
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Restaurant or cuisine..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating: {minRating}+
              </label>
              <input
                type="range"
                id="rating"
                min="0"
                max="5"
                step="0.1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>5</span>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="low">$ (Budget)</option>
                <option value="medium">$$ (Average)</option>
                <option value="high">$$$ (Expensive)</option>
              </select>
            </div>

            {/* Open Now */}
            <div className="flex items-center">
              <input
                id="open-now"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
              />
              <label htmlFor="open-now" className="ml-2 block text-sm text-gray-700">
                Open Now
              </label>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
          </p>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant._id} className="border rounded-lg overflow-hidden shadow-sm">
                <img 
                  className="w-full h-48 object-cover" 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span>⭐ {restaurant.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{restaurant.deliveryTime} min</span>
                    <span className="mx-2">•</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <Link to = {`/user/restaurant/${restaurant._id}`} className="inline-block bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">View Menu</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No restaurants found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListingPage;