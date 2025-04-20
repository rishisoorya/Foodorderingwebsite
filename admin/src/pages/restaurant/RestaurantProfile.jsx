import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";

function RestaurantProfile() {
  const [data, isLoading, error, refetch] = useFetch(
    "/restaurant/get/restaurant/profile"
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newRating, setNewRating] = useState(""); // New rating state

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg text-gray-600">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">Error loading profile</h2>
      </div>
    );

  const { findRestaurant } = data;

  const handleStatusChange = async () => {
    try {
      await axiosInstance.put("/restaurant/update", {
        isOpen: selectedStatus === "open",
      });
      toast.success(`Restaurant marked as ${selectedStatus.toUpperCase()}`, {
        style: {
          background: "#f9fafb",
          color: "#065f46",
          border: "1px solid #a7f3d0",
        },
      });
      refetch();
      setSelectedStatus("");
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update status", {
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    }
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("image", newImageFile);

    try {
      await axiosInstance.put("/restaurant/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully!", {
        style: {
          background: "#f9fafb",
          color: "#065f46",
          border: "1px solid #a7f3d0",
        },
      });
      refetch();
      setNewImageFile(null);
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image", {
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    }
  };

  const handleRatingUpdate = async () => {
    try {
      await axiosInstance.put("/restaurant/update", {
        rating: Number(newRating),
      });
      toast.success(`Rating updated to ${newRating}`, {
        style: {
          background: "#f9fafb",
          color: "#065f46",
          border: "1px solid #a7f3d0",
        },
      });
      refetch();
      setNewRating("");
    } catch (err) {
      console.error("Rating update failed:", err);
      toast.error("Failed to update rating", {
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        },
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-pink-50 p-8 md:p-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Restaurant Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your restaurant information and settings
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-pink-100">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 p-6 bg-pink-50 flex flex-col items-center">
              <div className="relative group">
                <img
                  src={findRestaurant.image}
                  alt="Restaurant"
                  className="w-64 h-64 object-cover rounded-xl border-2 border-pink-200 shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">Current Image</span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Change Restaurant Image
                </label>
                <div className="flex flex-col space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImageFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-pink-100 file:text-pink-700
                      hover:file:bg-pink-200"
                  />
                  <button
                    onClick={handleImageUpload}
                    disabled={!newImageFile}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition duration-300 ${
                      newImageFile
                        ? "bg-pink-600 hover:bg-pink-700 text-white shadow-md"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {findRestaurant.name}
              </h2>

              <div className="space-y-5">
                {/* Restaurant Info */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Restaurant Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-medium text-pink-600">Email:</span>{" "}
                      {findRestaurant.email}
                    </p>
                    <p>
                      <span className="font-medium text-pink-600">Phone:</span>{" "}
                      {findRestaurant.phone}
                    </p>
                    <p>
                      <span className="font-medium text-pink-600">Status:</span>{" "}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          findRestaurant.isOpen
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {findRestaurant.isOpen ? "Open" : "Closed"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-pink-600">Rating:</span>{" "}
                      {findRestaurant.rating ?? "Not Rated"}
                    </p>
                  </div>
                </div>

                {/* Status Update */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Update Restaurant Status
                  </h3>
                  <div className="space-y-4">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                    >
                      <option value="">-- Select New Status --</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={handleStatusChange}
                      disabled={!selectedStatus}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition duration-300 ${
                        selectedStatus
                          ? "bg-pink-600 hover:bg-pink-700 text-white shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Update Status
                    </button>
                  </div>
                </div>

                {/* Rating Update */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Update Restaurant Rating
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="number"
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      placeholder="Enter new rating (1 - 5)"
                      min={1}
                      max={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                    />
                    <button
                      onClick={handleRatingUpdate}
                      disabled={
                        !newRating ||
                        Number(newRating) < 1 ||
                        Number(newRating) > 5
                      }
                      className={`w-full py-3 px-4 rounded-xl font-medium transition duration-300 ${
                        newRating &&
                        Number(newRating) >= 1 &&
                        Number(newRating) <= 5
                          ? "bg-pink-600 hover:bg-pink-700 text-white shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Update Rating
                    </button>
                  </div>
                </div>
                {/* End Rating Section */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
