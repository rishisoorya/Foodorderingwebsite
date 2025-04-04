import React, { useState } from 'react';
import MenuCard from '../components/MenuCard.jsx';
import UseFetch from './hooks/UseFetch.jsx'


const RestaurantPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch restaurant data (assuming your endpoint returns a single restaurant)
  const [restaurantData, isLoading, error] = UseFetch('/restaurant');
  const menuItems = restaurantData?.menu || [];
  
  const categories = ['all', ...new Set(menuItems.map(item => item?.category))].filter(Boolean);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item?.category === activeCategory;
    const matchesSearch = item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">Error loading menu</h2>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="h-64 w-full overflow-hidden relative">
          <img
            src={restaurantData?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
            alt={restaurantData?.name || 'Restaurant'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{restaurantData?.name || 'Our Restaurant'}</h1>
            <div className="flex items-center mt-2">
              <span>⭐ 4.8</span>
              <span className="mx-2">•</span>
              <span>20-30 min delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full px-4 py-2 border rounded-md mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex overflow-x-auto gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item._id || item.id} foodItem={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <h3 className="text-lg font-medium">No menu items found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;