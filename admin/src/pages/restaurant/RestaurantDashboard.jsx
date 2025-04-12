import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiLogOut,
  FiChevronRight,
  FiCreditCard,
  FiShoppingBag,
} from "react-icons/fi";
import axiosInstance from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/restaurant/logout");
      toast.success(response?.data?.message || "Logout successful");
      setTimeout(() => {
        navigate("/restaurant/login", { replace: true });
      }, 300);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-orange-700 to-orange-600 text-white flex flex-col p-6 fixed inset-0 shadow-xl">
        <div className="text-3xl font-bold mb-12 flex items-center">
          <span className="bg-white text-orange-600 px-2 py-1 rounded mr-2">
            RESTAURANT
          </span>
         
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <Link
            to="/restaurant"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/restaurant") 
                ? "bg-white text-orange-600 font-medium shadow-md"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FiHome className="text-xl" />
            <span>Dashboard</span>
            {isActive("/restaurant") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/restaurant/menu"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/restaurant/menu") 
                ? "bg-white text-orange-600 font-medium shadow-md"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FiClipboard className="text-xl" />
            <span>Menu Items</span>
            {isActive("/restaurant/menu") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/restaurant/orders"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/restaurant/orders") 
                ? "bg-white text-orange-600 font-medium shadow-md"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FiShoppingBag className="text-xl" />
            <span>Orders</span>
            {isActive("/restaurant/orders") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/restaurant/payments"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/restaurant/payments") 
                ? "bg-white text-orange-600 font-medium shadow-md"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            <FiCreditCard className="text-xl" />
            <span>Payments</span>
            {isActive("/restaurant/payments") && <FiChevronRight className="ml-auto" />}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg p-3 rounded-lg mt-auto hover:bg-orange-500 hover:text-white transition-all duration-200 group"
          >
            <FiLogOut className="text-xl group-hover:animate-pulse" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;