import React, { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard'; // Import the card component we created

const RestaurantListingPage = () => {
  // Sample restaurant data
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Gourmet Paradise",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.5,
      cuisine: ["Italian", "Mediterranean"],
      deliveryTime: 25,
      priceRange: "$$$",
      isPromoted: true,
      isOpen: true
    },
    {
      id: 2,
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.2,
      cuisine: ["American", "Fast Food"],
      deliveryTime: 20,
      priceRange: "$$",
      isPromoted: false,
      isOpen: true
    },
    {
      id: 3,
      name: "Sushi World",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      cuisine: ["Japanese", "Sushi"],
      deliveryTime: 30,
      priceRange: "$$$$",
      isPromoted: true,
      isOpen: true
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 3.9,
      cuisine: ["Mexican", "Latin"],
      deliveryTime: 35,
      priceRange: "$$",
      isPromoted: false,
      isOpen: false
    },
    {
      id: 5,
      name: "Curry House",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.3,
      cuisine: ["Indian", "Asian"],
      deliveryTime: 40,
      priceRange: "$$",
      isPromoted: false,
      isOpen: true
    },
    {
      id: 6,
      name: "Pizza Heaven",
      image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.1,
      cuisine: ["Italian", "Pizza"],
      deliveryTime: 25,
      priceRange: "$$",
      isPromoted: true,
      isOpen: true
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
                         restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRating = restaurant.rating >= minRating;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && restaurant.priceRange.length <= 2) ||
                        (priceFilter === 'medium' && restaurant.priceRange.length === 3) ||
                        (priceFilter === 'high' && restaurant.priceRange.length >= 4);
    const matchesOpenStatus = !openNow || restaurant.isOpen;
    
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
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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