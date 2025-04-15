import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RestaurantLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/restaurant/login", data);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/restaurant");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-pink-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
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
          <h2 className="text-3xl font-bold text-pink-800 mb-2">
            Restaurant Portal
          </h2>
          <p className="text-pink-600">Sign in to manage your restaurant</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-pink-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-400" : "border-pink-200"
                } focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                placeholder="your@restaurant.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-pink-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-400" : "border-pink-200"
                } focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-pink-300 rounded"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-pink-700"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/restaurant/forgot-password"
                className="text-sm font-medium text-pink-600 hover:text-pink-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : ""
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-pink-500">
                  New restaurant?
                </span>
              </div>
            </div>

            <Link
              to="/restaurant/signup"
              className="mt-6 w-full flex justify-center py-2.5 px-4 border border-pink-300 rounded-lg text-sm font-medium text-pink-600 bg-white hover:bg-pink-50 transition-colors"
            >
              Register your restaurant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;