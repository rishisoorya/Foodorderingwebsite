import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";
import {
  FiSearch,
  FiTrash2,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";

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
      setFilteredRestaurants(
        response.data.restaurant ? [response.data.restaurant] : []
      );
    } catch (err) {
      console.error("Error searching restaurant:", err);
      setFilteredRestaurants([]);
    }
  };

  const displayData =
    filteredRestaurants.length > 0 ? filteredRestaurants : data?.restaurant;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <h1 className="font-bold text-4xl md:text-5xl mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Our Restaurant Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exquisite dining experiences from our curated collection of
            restaurant partners
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 max-w-4xl mx-auto"
        >
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by restaurant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="border border-gray-200 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 w-full md:w-auto whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Search Restaurants
          </button>
        </motion.div>

        {/* Restaurant Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-800">
              Error loading restaurants
            </h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              {error.message}
            </p>
            <button
              onClick={refetch}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-8 mt-5 mb-16"
          >
            {displayData?.map((restaurant) => (
              <motion.div
                key={restaurant._id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="w-80 bg-white shadow-lg rounded-2xl overflow-hidden duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={
                      restaurant.image ||
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    }
                    alt={restaurant.name}
                    className="h-64 w-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(restaurant._id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-md"
                    title="Delete restaurant"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="px-6 py-5">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800 truncate">
                      {restaurant.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        restaurant.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {restaurant.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <FiMapPin className="text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600 text-sm truncate">
                        {restaurant.address || "No address provided"}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        {restaurant.phone || "No phone provided"}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-3 flex-shrink-0" />
                      <p className="text-gray-600 text-sm truncate">
                        {restaurant.email}
                      </p>
                    </div>

                    {restaurant.openingHours && (
                      <div className="flex items-center">
                        <FiClock className="text-gray-400 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">
                          {restaurant.openingHours}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Empty State */}
        {displayData?.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full">
              <FiSearch className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="mt-6 text-2xl font-medium text-gray-800">
              No restaurants found
            </h3>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              {searchTerm.trim()
                ? "We couldn't find any restaurants matching your search. Try a different name."
                : "There are currently no restaurants available. Please check back later."}
            </p>
            {searchTerm.trim() && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  refetch();
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AllRestaurants;
