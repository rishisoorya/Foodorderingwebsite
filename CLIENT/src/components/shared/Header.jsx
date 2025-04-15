import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
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

          {/* Mobile menu button */}
          <div className="flex items-center lg:order-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center lg:order-2 space-x-4">
            <Link to="/login">
              <button className="relative px-6 py-2 font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full group overflow-hidden transition-all duration-300 hover:from-pink-600 hover:to-purple-700">
                <span className="relative z-10">Log In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </button>
            </Link>
            <Link to="/signup">
              <button className="relative px-6 py-2 font-medium text-purple-600 border-2 border-purple-600 rounded-full group overflow-hidden transition-all duration-300 hover:text-white">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-full"></span>
              </button>
            </Link>
          </div>

          {/* Navigation Links - Removed all links except auth buttons */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* Navigation links removed */}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="lg:hidden flex flex-col space-y-4 mt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300 hover:from-pink-600 hover:to-purple-700">
                  Log In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 font-medium text-purple-600 border-2 border-purple-600 rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;