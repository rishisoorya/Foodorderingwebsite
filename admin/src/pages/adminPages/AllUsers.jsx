import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import axiosInstance from "../../config/axiosInstance.jsx";
import { FiTrash2, FiUser, FiMail, FiPhone, FiShield } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

function AllUsers() {
  const [data, isLoading, error, refetch] = useFetch("/user/users");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleDelete = async (id) => {
    setDeleteLoading(id);
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Total users: {data?.users?.length || 0}
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center my-12">
          <PulseLoader color="#3B82F6" size={15} />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">Error loading users: {error.message}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && data?.users?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
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
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            There are currently no users in the system.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.users?.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <FiUser size={24} />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <FiShield className="mr-1" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiMail className="mr-2 text-gray-400 dark:text-gray-500" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiPhone className="mr-2 text-gray-400 dark:text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={deleteLoading === user._id}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors duration-200"
                >
                  {deleteLoading === user._id ? (
                    <PulseLoader color="#fff" size={8} />
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