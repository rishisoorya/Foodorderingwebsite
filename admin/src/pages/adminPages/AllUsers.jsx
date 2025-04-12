import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import axiosInstance from "../../config/axiosInstance.jsx";
import { FiSearch, FiTrash2, FiUser, FiMail, FiPhone, FiShield } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

function AllUsers() {
  const [data, isLoading, error, refetch] = useFetch("/user/users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleDelete = async (id) => {
    setDeleteLoading(id);
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      refetch(); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await axiosInstance.get(`/user/by/${searchTerm}`);
      setFilteredUsers(response.data.user ? [response.data.user] : []);
    } catch (err) {
      console.error("Error searching user:", err);
      setFilteredUsers([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Reset filtered users when search term is cleared
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
    }
  }, [searchTerm]);

  const displayData = filteredUsers.length > 0 ? filteredUsers : data?.users;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-2">
            {filteredUsers.length > 0 
              ? "Search results" 
              : `Total users: ${data?.users?.length || 0}`}
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex shadow-sm rounded-lg">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
            >
              {isSearching ? (
                <PulseLoader color="#fff" size={8} />
              ) : (
                <>
                  <FiSearch className="mr-2" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      {isLoading && !isSearching && (
        <div className="flex justify-center my-12">
          <PulseLoader color="#3B82F6" size={15} />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading users: {error.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && displayData?.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-gray-500">
            {filteredUsers.length > 0
              ? "No users match your search criteria."
              : "There are currently no users in the system."}
          </p>
        </div>
      )}

      {/* User List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayData?.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-white shadow"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <FiUser size={24} />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiShield className="mr-1" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FiMail className="mr-2 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPhone className="mr-2 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={deleteLoading === user._id}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {deleteLoading === user._id ? (
                    <PulseLoader color="#DC2626" size={8} />
                  ) : (
                    <>
                      <FiTrash2 className="mr-2" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;