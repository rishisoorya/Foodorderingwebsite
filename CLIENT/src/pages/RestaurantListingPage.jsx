import { useState } from "react";
import { Link } from "react-router-dom";
import UseFetch from "../hooks/UseFetch.jsx";

function RestaurantListingPage() {
  const [data, isLoading, error] = UseFetch("/restaurant/all");

  const restaurantsArray = Array.isArray(data?.restaurant)
    ? data.restaurant
    : data?.findRestaurant
    ? [data.findRestaurant]
    : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState("all");

  const filteredRestaurants = restaurantsArray.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isOpen = restaurant.isOpen;

    const matchesOpenStatus =
      openFilter === "all" ||
      (openFilter === "open" && isOpen) ||
      (openFilter === "closed" && !isOpen);

    return matchesSearch && matchesOpenStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading restaurants: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Local Restaurants</h1>
          <p className="text-xl mb-8">Find your favorite food from the best restaurants in town</p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "Restaurant" : "Restaurants"} Available
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setOpenFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                openFilter === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setOpenFilter("open")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                openFilter === "open"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Open Now
            </button>
            <button
              onClick={() => setOpenFilter("closed")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                openFilter === "closed"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => {
              const isOpen = restaurant.isOpen;
              const CardWrapper = isOpen ? Link : "div";

              return (
                <CardWrapper
                  key={restaurant._id}
                  to={isOpen ? `/user/restaurant/${restaurant._id}` : undefined}
                  style={{ cursor: isOpen ? "pointer" : "not-allowed" }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        isOpen
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isOpen ? "Open Now" : "Closed"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-600">
                          {restaurant.rating || "4.5"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{restaurant.phone}</p>
                    <div className="flex items-center text-gray-500 mb-3">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">123 Main St, City</span>
                    </div>
                    <div className="mt-4 block text-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                      {isOpen ? "View Menu" : "Currently Closed"}
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
}

export default RestaurantListingPage;
