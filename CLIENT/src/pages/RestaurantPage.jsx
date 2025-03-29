import React, { useState } from 'react';
import MenuCard from '../components/MenuCard'; // Import the MenuCard component we created earlier

const RestaurantPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample restaurant data
  const restaurant = {
    name: "Gourmet Paradise",
    rating: 4.7,
    reviewCount: 1243,
    cuisine: "Italian, Mediterranean",
    address: "123 Food Street, San Francisco",
    deliveryTime: "25-35 min",
    priceRange: "$$$",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  };

  // Sample menu data
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 12.99,
      rating: 4.5,
      reviewCount: 128,
      description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
      category: "pizza",
      isPopular: true,
      tags: ["vegetarian"],
      dietaryInfo: ["Gluten-free option"]
    },
    {
      id: 2,
      name: "Truffle Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 16.99,
      rating: 4.7,
      reviewCount: 89,
      description: "Homemade pasta with black truffle cream sauce and parmesan",
      category: "pasta",
      isPopular: true,
      tags: [],
      dietaryInfo: ["Vegetarian option"]
    },
    {
      id: 3,
      name: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 9.99,
      rating: 4.2,
      reviewCount: 64,
      description: "Fresh romaine lettuce with Caesar dressing, croutons and parmesan",
      category: "salad",
      isPopular: false,
      tags: [],
      dietaryInfo: []
    },
    {
      id: 4,
      name: "Garlic Bread",
      image: "https://images.unsplash.com/photo-1586449480558-33ae22ffc60b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 5.99,
      rating: 4.0,
      reviewCount: 42,
      description: "Freshly baked bread with garlic butter and herbs",
      category: "appetizer",
      isPopular: false,
      tags: ["vegetarian"],
      dietaryInfo: []
    },
    {
      id: 5,
      name: "Tiramisu",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 7.99,
      rating: 4.8,
      reviewCount: 93,
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
      category: "dessert",
      isPopular: true,
      tags: ["vegetarian"],
      dietaryInfo: []
    },
    {
      id: 6,
      name: "Grilled Salmon",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 18.99,
      rating: 4.6,
      reviewCount: 76,
      description: "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables",
      category: "main",
      isPopular: false,
      tags: [],
      dietaryInfo: ["Gluten-free", "Dairy-free option"]
    }
  ];

  // Get unique categories
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  // Filter menu items based on active category and search term
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Restaurant Header */}
      <div className="relative bg-white shadow-sm">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-medium">{restaurant.rating}</span>
                <span className="mx-1">•</span>
                <span>{restaurant.reviewCount} reviews</span>
              </div>
            </div>
            <p className="mt-1 text-gray-200">{restaurant.cuisine}</p>
            <p className="mt-1 text-gray-200">{restaurant.address}</p>
            <div className="mt-2 flex items-center">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                restaurant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {restaurant.isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="ml-2 text-sm">{restaurant.deliveryTime} delivery</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{restaurant.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search menu items..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} foodItem={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No menu items found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;