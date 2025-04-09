import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";

function AllRestaurants() {
  const [data, isLoading, error, refetch] = useFetch("/restaurant/all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/restaurant/delete/${id}`);
      refetch(); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      refetch(); // Reset to all restaurants if input is cleared
      setFilteredRestaurants([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/restaurant/by/${searchTerm}`);
      setFilteredRestaurants(response.data.restaurant ? [response.data.restaurant] : []);
    } catch (err) {
      console.error("Error searching restaurant:", err);
      setFilteredRestaurants([]); // Optional: clear if not found
    }
  };

  const displayData = filteredRestaurants.length > 0 ? filteredRestaurants : data?.restaurant;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Restaurants</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayData?.map((rest) => (
          <div
            key={rest._id}
            className="flex items-center border rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={rest.image}
              alt={rest.name}
              className="w-32 h-32 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{rest.name}</h3>
              <p className="text-sm text-gray-600">{rest.email}</p>
              <p className="text-sm text-gray-600">{rest.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(rest._id)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRestaurants;
