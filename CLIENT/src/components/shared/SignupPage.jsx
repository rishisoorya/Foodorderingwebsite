import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validate()) {
      setIsSubmitting(true);
      const submitData = {
        ...formData,
        phone: formData.phone.startsWith("+91")
          ? formData.phone
          : `+91${formData.phone}`,
      };
      try {
        const response = await axiosInstance.post("/user/signup", submitData);
        toast.success(response.data?.message || "Registration successful");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (error) {
        if (error.response) {
          setError(error.response.data?.message || "Registration failed");
        } else if (error.request) {
          setError("No response from server. Please try again later.");
        } else {
          setError("Error setting up request: " + error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-pink-600">
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>
        <div className="absolute inset-0 bg-noise opacity-10 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Pink themed restaurant"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute bottom-10 left-10 z-20 text-white">
          <h2 className="text-5xl font-serif font-bold mb-4 animate-fadeIn">
            Sweet Indulgence
          </h2>
          <p className="text-xl font-light opacity-90 max-w-md animate-fadeIn delay-100">
            Join our vibrant community of food enthusiasts
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
          <div className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-pink-700/50 text-white rounded-xl border border-pink-800/50 animate-fadeIn">
                {error}
              </div>
            )}

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center bg-white rounded-full w-20 h-20 mb-6 shadow-lg transform transition-all hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-serif font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-pink-100 font-light">
                Begin your delicious journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-pink-100 mb-2 group-hover:text-white transition-colors"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink-200 group-hover:text-white transition-colors">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/20 border ${
                        errors.name
                          ? "border-red-300 focus:ring-red-300/30"
                          : "border-white/30 focus:ring-white/30"
                      } text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:border-white transition-all duration-300`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-white animate-fadeIn">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-pink-100 mb-2 group-hover:text-white transition-colors"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink-200 group-hover:text-white transition-colors">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/20 border ${
                        errors.email
                          ? "border-red-300 focus:ring-red-300/30"
                          : "border-white/30 focus:ring-white/30"
                      } text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:border-white transition-all duration-300`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-white animate-fadeIn">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-pink-100 mb-2 group-hover:text-white transition-colors"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-white/30 bg-white/20 text-pink-200 text-sm group-hover:text-white transition-colors">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-4 pr-4 py-3.5 rounded-r-xl bg-white/20 border ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-300/30"
                          : "border-white/30 focus:ring-white/30"
                      } text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:border-white transition-all duration-300`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-white animate-fadeIn">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-pink-100 mb-2 group-hover:text-white transition-colors"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink-200 group-hover:text-white transition-colors">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/20 border ${
                        errors.password
                          ? "border-red-300 focus:ring-red-300/30"
                          : "border-white/30 focus:ring-white/30"
                      } text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:border-white transition-all duration-300`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-white animate-fadeIn">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="focus:ring-white h-5 w-5 text-pink-600 bg-white/20 border-white/30 rounded focus:ring-2"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-medium text-pink-100 hover:text-white transition-colors"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-white hover:text-pink-100 underline transition-colors"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-white hover:text-pink-100 underline transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center px-8 py-4 border border-transparent rounded-xl text-lg font-medium text-pink-600 bg-white hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg transform transition-all hover:scale-[1.02] active:scale-100 ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-pink-600"
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Join Now
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-transparent text-sm text-pink-200">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                {
                  name: "Facebook",
                  icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                  color: "bg-blue-600 hover:bg-blue-700",
                },
                {
                  name: "Twitter",
                  icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                  color: "bg-sky-500 hover:bg-sky-600",
                },
                {
                  name: "Google",
                  icon: "M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1 12.545 1 7.021 1 2.543 5.477 2.543 11s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z",
                  color: "bg-red-600 hover:bg-red-700",
                },
              ].map((social, index) => (
                <div key={index}>
                  <button
                    className={`w-full inline-flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-medium text-white ${social.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/10 transition-all transform hover:scale-105`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-pink-200">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-white hover:text-pink-100 underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;