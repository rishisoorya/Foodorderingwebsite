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
} from "react-icons/fi";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/admin/logout");
      toast.success(response?.data?.message || "Logout successful");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 300);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col p-6 fixed inset-0 shadow-xl">
        <div className="text-3xl font-bold mb-12 flex items-center">
          <span className="bg-pink-600 text-white px-2 py-1 rounded mr-2">food</span>
          <span className="text-pink-400">panda</span>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <Link
            to="/admin"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/admin") 
                ? "bg-pink-600 text-white font-medium shadow-md"
                : "hover:bg-gray-700 hover:text-pink-300"
            }`}
          >
            <FiHome className="text-xl" />
            <span>Dashboard</span>
            {isActive("/admin") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/admin/restaurants"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/admin/restaurants") 
                ? "bg-pink-600 text-white font-medium shadow-md"
                : "hover:bg-gray-700 hover:text-pink-300"
            }`}
          >
            <FiClipboard className="text-xl" />
            <span>Restaurants</span>
            {isActive("/admin/restaurants") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/admin/users") 
                ? "bg-pink-600 text-white font-medium shadow-md"
                : "hover:bg-gray-700 hover:text-pink-300"
            }`}
          >
            <FiUsers className="text-xl" />
            <span>Users</span>
            {isActive("/admin/users") && <FiChevronRight className="ml-auto" />}
          </Link>

          <Link
            to="/admin/payments"
            className={`flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-200 ${
              isActive("/admin/payments") 
                ? "bg-pink-600 text-white font-medium shadow-md"
                : "hover:bg-gray-700 hover:text-pink-300"
            }`}
          >
            <FiCreditCard className="text-xl" />
            <span>All Payments</span>
            {isActive("/admin/payments") && <FiChevronRight className="ml-auto" />}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg p-3 rounded-lg mt-auto hover:bg-gray-700 hover:text-red-400 transition-all duration-200 group"
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

export default AdminDashboard;