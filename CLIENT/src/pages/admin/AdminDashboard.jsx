import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-purple-600">Admin Panel</h2>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Logout
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default AdminDashboard;
