import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UseFetch from "../hooks/useFetch";


const LandPage = () => {
  const [data, isLoading, error, refetch] = UseFetch("/restaurant/all");
  const navigate = useNavigate();
  const restaurants = data?.restaurant || [];

  const handleViewMenu = (restaurantId) => {
    // Check if the restaurant exists before navigating
    const restaurantExists = restaurants.some(r => r._id === restaurantId);
    if (restaurantExists) {
      navigate(`/restaurants/${restaurantId}`);
    } else {
      // Fallback to restaurants listing if restaurant not found
      navigate('/restaurants');
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">Error loading restaurants</h2>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-pink-50 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Delicious food, delivered to your door
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Order from your favorite local restaurants with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/restaurants"
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Order Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Restaurants */}
      <div className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Restaurants</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.slice(0, 3).map((restaurant) => (
            <div key={restaurant._id} className="border rounded-lg overflow-hidden shadow-sm">
              <img 
                className="w-full h-48 object-cover" 
                src={restaurant.image} 
                alt={restaurant.name} 
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span>⭐ {restaurant.rating || '4.5'}</span>
                  <span className="mx-2">•</span>
                  <span>{restaurant.deliveryTime || '25-35'} min</span>
                </div>
               
                <Link to = {`/user/restaurant/${restaurant._id}`} className="inline-block bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">View Menu</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of your components... */}
    </div>
  );
};

export default LandPage;