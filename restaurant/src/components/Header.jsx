import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSeller } from '../../redux/actions/sellerActions';
import axiosInstance from '../../axios/axiosInstance';
import toast from 'react-hot-toast';

const SellerHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector(state => state.seller);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get('/seller/restaurant');
        setRestaurant(response.data.restaurant);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    if (seller) {
      fetchRestaurant();
    }
  }, [seller]);

  const handleLogout = () => {
    dispatch(logoutSeller());
    toast.success('Logged out successfully');
    navigate('/seller/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link to="/seller/dashboard" className="flex items-center">
            <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span className="text-xl font-bold text-gray-800">Seller Dashboard</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/seller/dashboard" 
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
          >
            Overview
          </Link>

          {/* Restaurant Dropdown */}
          <div className="relative group">
            <button 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 flex items-center"
            >
              Restaurant
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
              <Link 
                to="/seller/restaurant/profile" 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Restaurant Profile
              </Link>
              <Link 
                to="/seller/restaurant/update" 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Update Restaurant
              </Link>
            </div>
          </div>

          {/* Orders */}
          <Link 
            to="/seller/orders" 
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
          >
            Orders
          </Link>

          {/* Menu Dropdown */}
          <div className="relative group">
            <button 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 flex items-center"
            >
              Menu
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
              <Link 
                to="/seller/menu/manage" 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Manage Menu
              </Link>
              <Link 
                to="/seller/menu/create" 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Create Menu Item
              </Link>
              <Link 
                to="/seller/menu/categories" 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Menu Categories
              </Link>
            </div>
          </div>

          {/* Analytics */}
          <Link 
            to="/seller/analytics" 
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
          >
            Analytics
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {restaurant?.name ? (
                  <span className="text-blue-600 font-semibold">
                    {restaurant.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-700">
                  {seller?.name || 'Seller'}
                </p>
                <p className="text-xs text-gray-500">
                  {restaurant?.name || 'Restaurant'}
                </p>
              </div>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link 
                  to="/seller/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <Link 
                  to="/seller/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {dropdownOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/seller/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setDropdownOpen(false)}
            >
              Overview
            </Link>

            <button 
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Restaurant
              <svg className={`w-4 h-4 ml-1 transition-transform ${menuDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {menuDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link 
                  to="/seller/restaurant/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Restaurant Profile
                </Link>
                <Link 
                  to="/seller/restaurant/update" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Update Restaurant
                </Link>
              </div>
            )}

            <Link 
              to="/seller/orders" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setDropdownOpen(false)}
            >
              Orders
            </Link>

            <Link 
              to="/seller/menu/manage" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setDropdownOpen(false)}
            >
              Manage Menu
            </Link>

            <Link 
              to="/seller/menu/create" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setDropdownOpen(false)}
            >
              Create Menu Item
            </Link>

            <Link 
              to="/seller/analytics" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setDropdownOpen(false)}
            >
              Analytics
            </Link>

            <div className="border-t border-gray-200 pt-2">
              <Link 
                to="/seller/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setDropdownOpen(false)}
              >
                Your Profile
              </Link>
              <Link 
                to="/seller/settings" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SellerHeader;