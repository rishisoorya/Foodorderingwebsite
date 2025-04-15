import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Userheader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success(response?.data?.message || "Logout");

      navigate("/");
    } catch (error) {
      console.error("logout failed", error.response?.message || error.message);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              foodpanda
            </span>
          </Link>

          {/* Right side icons (Cart + Profile) */}
          <div className="flex items-center space-x-6 lg:order-2">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-700 hover:text-purple-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLinkClick("profile");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  
                  <Link
                    to="/pages/OrdersPage"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLinkClick("orders");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Orders
                  </Link>
                  <Link
                    to="/logout"
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                      handleLinkClick("logout");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  onClick={() => handleLinkClick("home")}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                    activeLink === "home"
                      ? "text-purple-600 font-semibold"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurants"
                  onClick={() => handleLinkClick("restaurants")}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                    activeLink === "restaurants"
                      ? "text-purple-600 font-semibold"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  Restaurant
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleLinkClick("about")}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                    activeLink === "about"
                      ? "text-purple-600 font-semibold"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => handleLinkClick("contact")}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                    activeLink === "contact"
                      ? "text-purple-600 font-semibold"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Userheader;
