import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout.jsx";
import ErrorPage from "../pages/ErrorPage.jsx"; // 🔧 Fixed spacing in import path
import AdminDashboard from "../pages/AdminDashboard.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx";
import AdminLanding from "../pages/adminPages/AdminLanding.jsx";
import AllRestaurants from "../pages/adminPages/AllRestaurants.jsx";
import HomePage from "../pages/adminPages/HomePage.jsx";
import AllUsers from "../pages/adminPages/AllUsers.jsx";
import AllPaymentsPage from "../pages/adminPages/AllPaymentsPage.jsx";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <AdminLanding />,
      },
      {
        element: <ProtectRoutes />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />, // 👈 layout with sidebar and <Outlet />
            children: [
              {
                path: "", // /dashboard
                element: <HomePage />,
              },
              {
                path: "restaurants", // /dashboard/restaurants
                element: <AllRestaurants />,
              },
              {
                path: "users", // /dashboard/restaurants
                element: <AllUsers/>,
              },

              {
                path: "payments", // /dashboard/restaurants
                element: <AllPaymentsPage/>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Route;
