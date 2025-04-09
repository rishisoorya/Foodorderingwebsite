import React, { useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import axiosInstance from "../../config/axiosInstance.jsx";

function AllUsers() {
  const [data, isLoading, error, refetch] = useFetch("/user/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      refetch(); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      refetch(); // Reset to all users if input is cleared
      setFilteredUsers([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/user/by/${searchTerm}`);
      setFilteredUsers(response.data.user ? [response.data.user] : []);
    } catch (err) {
      console.error("Error searching user:", err);
      setFilteredUsers([]);
    }
  };

  const displayData = filteredUsers.length > 0 ? filteredUsers : data?.users;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

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

      {/* User List */}
      <div className="space-y-4">
        {displayData?.map((user) => (
          <div
            key={user._id}
            className="flex items-center border rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
              <p className="text-sm text-gray-500 italic">Role: {user.role}</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
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

export default AllUsers;
