import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";
import { FiArrowLeft, FiTag } from "react-icons/fi";

const CouponCreate = () => {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState({
    code: "",
    discountPercentage: 10,
    minOrderValue: 250,
    maxDiscValue: 30,
    expiryDate: "",
    isAvailable: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!couponData.code.trim()) {
      newErrors.code = "Coupon code is required";
    } else if (couponData.code.length < 4) {
      newErrors.code = "Coupon code must be at least 4 characters";
    }

    if (
      couponData.discountPercentage < 1 ||
      couponData.discountPercentage > 100
    ) {
      newErrors.discountPercentage = "Discount must be between 1% and 100%";
    }

    if (couponData.minOrderValue < 0) {
      newErrors.minOrderValue = "Minimum order value cannot be negative";
    }

    if (couponData.maxDiscValue < 0) {
      newErrors.maxDiscValue = "Maximum discount value cannot be negative";
    }

    if (!couponData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (new Date(couponData.expiryDate) < new Date()) {
      newErrors.expiryDate = "Expiry date must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const expiryDateISO = new Date(couponData.expiryDate).toISOString();

      const response = await axiosInstance.post("/coupon/create", {
        ...couponData,
        expiryDate: expiryDateISO,
      });

      toast.success(response.data.message || "Coupon created successfully!");
      navigate("/admin/coupons");
    } catch (error) {
      console.error("Coupon creation error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Please login to create coupons");
        } else if (error.response.status === 403) {
          toast.error("You are not authorized to create coupons");
        } else if (error.response.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          toast.error(
            error.response.data?.message || "Failed to create coupon"
          );
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-600 hover:text-pink-800 mr-4"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold flex items-center">
          <FiTag className="mr-2 text-pink-600" /> Create New Coupon
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coupon Code */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                name="code"
                value={couponData.code}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.code ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-pink-500 focus:border-pink-500`}
                placeholder="e.g. FESTIVE87"
              />
              {errors.code && (
                <p className="mt-1 text-xs text-red-500">{errors.code}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Unique code customers will enter at checkout (min 4 characters)
              </p>
            </div>

            {/* Discount Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage *
              </label>
              <input
                type="number"
                name="discountPercentage"
                min="1"
                max="100"
                value={couponData.discountPercentage}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.discountPercentage
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-pink-500 focus:border-pink-500`}
              />
              {errors.discountPercentage && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.discountPercentage}
                </p>
              )}
            </div>

            {/* Maximum Discount Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Discount Value *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="maxDiscValue"
                  min="0"
                  value={couponData.maxDiscValue}
                  onChange={handleChange}
                  className={`w-full px-8 py-2 border ${
                    errors.maxDiscValue ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.maxDiscValue && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.maxDiscValue}
                </p>
              )}
            </div>

            {/* Minimum Order Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order Value *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="minOrderValue"
                  min="0"
                  value={couponData.minOrderValue}
                  onChange={handleChange}
                  className={`w-full px-8 py-2 border ${
                    errors.minOrderValue ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.minOrderValue && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.minOrderValue}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="datetime-local"
                name="expiryDate"
                value={couponData.expiryDate}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                className={`w-full px-4 py-2 border ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-pink-500 focus:border-pink-500`}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                id="isAvailable"
                checked={couponData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isAvailable"
                className="ml-2 block text-sm text-gray-700"
              >
                Make this coupon immediately available
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/coupons")}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white ${
                isSubmitting
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
            >
              {isSubmitting ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponCreate;
