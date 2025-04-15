import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const RestaurantSignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const selectedImage = watch("image");

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      setError("image", {
        type: "manual",
        message: "Restaurant logo is required",
      });
      toast.error("Please select a restaurant logo", {
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca'
        }
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const response = await axiosInstance.post("/restaurant/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message, {
        style: {
          background: '#f9fafb',
          color: '#065f46',
          border: '1px solid #a7f3d0'
        }
      });
      setTimeout(() => navigate("/restaurant/login"), 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again.",
        {
          style: {
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca'
          }
        }
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setError("image", {
          type: "manual",
          message: "Only image files are allowed",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("image", {
          type: "manual",
          message: "Image must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create Restaurant Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Fill in your restaurant details to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-pink-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Logo *
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-lg bg-pink-50 border-2 border-dashed border-pink-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-8 w-8 text-pink-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-700 py-2 px-3 border border-pink-200 rounded-lg shadow-sm text-sm font-medium transition duration-200"
                  >
                    Choose File
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    {...register("image")}
                    onChange={handleImageChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedImage?.[0]?.name || "PNG, JPG up to 5MB"}
                  </p>
                  {errors.image && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="e.g. Coasta"
                {...register("name", {
                  required: "Restaurant name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="e.g. costa@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="e.g. +917894561238"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+91[6-9]\d{9}$/,
                    message: "Must be +91 followed by 10 digit Indian number",
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-md transition duration-300 ${
                  isSubmitting
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Register Restaurant"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link
              to="/restaurant/login"
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignupPage;