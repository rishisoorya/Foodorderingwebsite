import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Popular Cuisines Carousel
  const [currentCuisine, setCurrentCuisine] = useState(0);
  const cuisines = [
    {
      name: "Italian",
      restaurants: [
        {
          name: "La Bella Italia",
          rating: "4.8",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Pasta Palace",
          rating: "4.6",
          image: "https://images.unsplash.com/photo-1600628421060-939639517883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Romano's",
          rating: "4.7",
          image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    {
      name: "Japanese",
      restaurants: [
        {
          name: "Tokyo Sushi",
          rating: "4.9",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Sakura House",
          rating: "4.7",
          image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Ramen Street",
          rating: "4.5",
          image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    {
      name: "American",
      restaurants: [
        {
          name: "Burger Joint",
          rating: "4.5",
          image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Steakhouse",
          rating: "4.8",
          image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Diner 24/7",
          rating: "4.4",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ];

  // Featured Restaurants Carousel
  const [currentRestaurant, setCurrentRestaurant] = useState(0);
  const featuredRestaurants = [
    {
      name: "The Gourmet Spot",
      cuisine: "Fine Dining",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Seafood Haven",
      cuisine: "Seafood",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Vegetarian Delight",
      cuisine: "Vegetarian",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Auto-rotate carousels
  useEffect(() => {
    const cuisineInterval = setInterval(() => {
      setCurrentCuisine((prev) => (prev + 1) % cuisines.length);
    }, 5000);
    
    const restaurantInterval = setInterval(() => {
      setCurrentRestaurant((prev) => (prev + 1) % featuredRestaurants.length);
    }, 4000);
    
    return () => {
      clearInterval(cuisineInterval);
      clearInterval(restaurantInterval);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-pink-50 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover the best restaurants near you
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Order from top-rated restaurants with just a few taps
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

      {/* Cuisines Carousel */}
      <div className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Cuisines</h2>
        
        <div className="relative h-96">
          <div className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentCuisine * 100}%)` }}>
            {cuisines.map((cuisine, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">{cuisine.name}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {cuisine.restaurants.map((restaurant, rIndex) => (
                      <div key={rIndex} className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative h-64">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h4 className="text-white font-bold text-lg">{restaurant.name}</h4>
                            <div className="flex items-center text-pink-300">
                              <span>★</span>
                              <span className="ml-1 text-white">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {cuisines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCuisine(index)}
                className={`w-3 h-3 rounded-full ${currentCuisine === index ? 'bg-pink-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Restaurants Carousel */}
      <div className="py-12 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Restaurants</h2>
          
          <div className="relative">
            <div className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentRestaurant * 100}%)` }}>
              {featuredRestaurants.map((restaurant, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                      <div className="text-white">
                        <h3 className="text-3xl font-bold">{restaurant.name}</h3>
                        <div className="flex items-center mt-2">
                          <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {restaurant.rating} ★
                          </span>
                          <span className="ml-3 text-white">{restaurant.cuisine}</span>
                        </div>
                        <Link 
                          to="/restaurants" 
                          className="inline-block mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors duration-300"
                        >
                          View Menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredRestaurants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRestaurant(index)}
                  className={`w-3 h-3 rounded-full ${currentRestaurant === index ? 'bg-pink-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to order?</h2>
          <p className="mt-4 text-lg text-pink-100">
            Download our app for faster ordering and exclusive deals
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              <span className="mr-2">App Store</span>
              <span>→</span>
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
              <span className="mr-2">Google Play</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;