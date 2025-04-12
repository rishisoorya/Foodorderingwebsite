import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";
import { FiSearch, FiTrash2, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

function AllRestaurants() {
  const [data, isLoading, error, refetch] = useFetch("/restaurant/all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/restaurant/delete/${id}`);
      refetch();
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      refetch();
      setFilteredRestaurants([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/restaurant/by/${searchTerm}`);
      setFilteredRestaurants(response.data.restaurant ? [response.data.restaurant] : []);
    } catch (err) {
      console.error("Error searching restaurant:", err);
      setFilteredRestaurants([]);
    }
  };

  const displayData = filteredRestaurants.length > 0 ? filteredRestaurants : data?.restaurant;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="text-center p-6">
        <h1 className="font-bold text-3xl md:text-4xl mb-2 text-gray-800">Our Restaurant Partners</h1>
        <p className="text-lg text-gray-600">Discover all the amazing dining options available</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 max-w-4xl mx-auto">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by restaurant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto whitespace-nowrap"
        >
          Search Restaurants
        </button>
      </div>

      {/* Restaurant Grid */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading restaurants...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Error loading restaurants: {error.message}
        </div>
      ) : (
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-8 mt-5 mb-10">
          {displayData?.map((restaurant) => (
            <div key={restaurant._id} className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <img
                  src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                  alt={restaurant.name}
                  className="h-60 w-full object-cover rounded-t-xl"
                />
                <button
                  onClick={() => handleDelete(restaurant._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  title="Delete restaurant"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
              
              <div className="px-5 py-4 w-80">
                <h2 className="text-xl font-bold text-gray-800 truncate">{restaurant.name}</h2>
                
                <div className="flex items-center mt-2 text-gray-600">
                  <FiMapPin className="mr-2" />
                  <p className="text-sm truncate">{restaurant.address || "No address provided"}</p>
                </div>
                
                <div className="flex items-center mt-1 text-gray-600">
                  <FiPhone className="mr-2" />
                  <p className="text-sm">{restaurant.phone || "No phone provided"}</p>
                </div>
                
                <div className="flex items-center mt-1 text-gray-600">
                  <FiMail className="mr-2" />
                  <p className="text-sm truncate">{restaurant.email}</p>
                </div>
                
                <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-200">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {restaurant.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Empty State */}
      {displayData?.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700">No restaurants found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or check back later</p>
        </div>
      )}
    </div>
  );
}

export default AllRestaurants;