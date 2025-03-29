import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";


const UserProfilePage = () => {
  // User data state
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    joinedDate: new Date(),
    preferences: {
      dietaryRestrictions: [],
      favoriteCuisines: [],
      notificationEnabled: false,
    },
  });

  // Order history state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  // Fetch user data and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, ordersResponse] = await Promise.all([
          axiosInstance.get("/user/profile"),
          axiosInstance.get("/order/get/all"),
        ]);
console.log("user",userResponse.user)
        setUser(userResponse.data);
        setTempUser(userResponse.data);
        setOrders(ordersResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({
      ...tempUser,
      [name]: value,
    });
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("/user/profile", tempUser);
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
    setError("");
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("", file);

      const response = await axiosInstance.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({ ...prev, avatar: response.data.avatarUrl }));
      setTempUser((prev) => ({ ...prev, avatar: response.data.avatarUrl }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  // Handle order rating
  const rateOrder = async (orderId, rating) => {
    try {
      await axiosInstance.post(`/orders/${orderId}/rate`, { rating });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, rating } : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit rating");
    }
  };

  if (loading && !user.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-pink-100">
                  <img
                    src={user.avatar || "https://via.placeholder.com/150"}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-1 text-sm cursor-pointer"
                      >
                        Change Photo
                      </label>
                    </>
                  )}
                </div>

                {!isEditing ? (
                  <>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600 mt-1">{user.phone}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Edit Profile"}
                    </button>
                  </>
                ) : (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={tempUser.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={loading}
                    />
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={loading}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={tempUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={loading}
                    />
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Address
                </h3>
                {!isEditing ? (
                  <p className="text-gray-600">
                    {user.address || "No address provided"}
                  </p>
                ) : (
                  <textarea
                    name="address"
                    value={tempUser.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={loading}
                  />
                )}
              </div>

              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Member Since
                </h3>
                <p className="text-gray-600">
                  {new Date(user.joinedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Preferences
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Dietary Restrictions
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.preferences.dietaryRestrictions?.length > 0 ? (
                        user.preferences.dietaryRestrictions.map(
                          (item, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {item}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-gray-500">None specified</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Favorite Cuisines
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.preferences.favoriteCuisines?.length > 0 ? (
                        user.preferences.favoriteCuisines.map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">None specified</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="notifications"
                      type="checkbox"
                      checked={user.preferences.notificationEnabled}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      onChange={async (e) => {
                        try {
                          const updatedPrefs = {
                            ...user.preferences,
                            notificationEnabled: e.target.checked,
                          };
                          const response = await axiosInstance.put(
                            "/user/preferences",
                            { preferences: updatedPrefs }
                          );
                          setUser({ ...user, preferences: response.data });
                        } catch (err) {
                          setError(
                            err.response?.data?.message ||
                              "Failed to update preferences"
                          );
                        }
                      }}
                      disabled={loading}
                    />
                    <label
                      htmlFor="notifications"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Email Notifications
                    </label>
                  </div>
                </div>

                <Link
                  to="/preferences"
                  className="mt-6 text-sm font-medium text-pink-600 hover:text-pink-700 inline-block"
                >
                  Edit Preferences
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order History
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your recent orders and status
                </p>
              </div>

              {loading && orders.length === 0 ? (
                <div className="p-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {order.restaurant}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                            <span>Order {order.id}</span>
                            <span>
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                            <span>
                              {order.items} {order.items > 1 ? "items" : "item"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                          <div className="mt-1 flex items-center justify-end">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {order.status === "Delivered" && (
                        <div className="mt-4 flex items-center justify-between">
                          <button
                            className="text-sm font-medium text-pink-600 hover:text-pink-700"
                            onClick={async () => {
                              try {
                                await axiosInstance.post(
                                  `/orders/${order.id}/reorder`
                                );
                                // Handle successful reorder (maybe show toast)
                              } catch (err) {
                                setError(
                                  err.response?.data?.message ||
                                    "Failed to reorder"
                                );
                              }
                            }}
                          >
                            Reorder
                          </button>
                          <div className="flex items-center">
                            {order.rating ? (
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < order.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => rateOrder(order.id, star)}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {orders.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <Link
                    to="/orders"
                    className="w-full block text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View All Orders
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Saved Addresses
                  </h2>
                  <Link
                    to="/addresses/new"
                    className="text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    + Add New
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {user.addresses?.length > 0 ? (
                  user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">
                          {address.label}
                        </h3>
                        <div className="flex space-x-2">
                          <Link
                            to={`/addresses/${address.id}/edit`}
                            className="text-gray-400 hover:text-pink-600"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={async () => {
                              try {
                                await axiosInstance.delete(
                                  `/addresses/${address.id}`
                                );
                                setUser({
                                  ...user,
                                  addresses: user.addresses.filter(
                                    (a) => a.id !== address.id
                                  ),
                                });
                              } catch (err) {
                                setError(
                                  err.response?.data?.message ||
                                    "Failed to delete address"
                                );
                              }
                            }}
                            className="text-gray-400 hover:text-pink-600"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {address.street}, {address.city}, {address.state}{" "}
                        {address.zipCode}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Phone: {address.phone}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    No saved addresses yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
