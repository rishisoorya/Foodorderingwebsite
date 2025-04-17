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
import RestaurantLogin from "../pages/restaurant/RestaurantLogin.jsx";
import RestaurantSignup from "../pages/restaurant/RestaurantSignup.jsx";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard.jsx";
import RestaurantOrdersPage from "../pages/restaurant/RestaurantOrdersPage.jsx";
import MenuCreateForm from "../pages/restaurant/MenuCreateForm.jsx";
import RestaurantPaymentPage from "../pages/restaurant/RestaurantPaymentPage.jsx";
import RestaurantProile from "../pages/restaurant/RestaurantProfile.jsx";
import RestaurantHomePage from "../pages/restaurant/RestaurantHomePage.jsx";
import CouponCreate from "../pages/adminPages/CouponCreate.jsx";
import RestaurantVerification from "../pages/adminPages/RestaurantVerification.jsx";

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
      { path: "restaurant/login", element: <RestaurantLogin /> },
      { path: "restaurant/signup", element: <RestaurantSignup /> },

      {
        path: "",
        element: <AdminLanding />,
      },
      
    
      {
        element: <ProtectRoutes />,
        
        children: [
          {
            path: "restaurant",
            element: <RestaurantDashboard />,
            children: [
              {
                path: "menu/create",
                element: <MenuCreateForm />,
              },
              {
                path: "orders",
                element: <RestaurantOrdersPage />,
              },
              {
                path: "payments",
                element: <RestaurantPaymentPage />,
              },
              {
                path: "profile",
                element: <RestaurantProile />,
              },
              {
                path: "dashboard",
                element: <RestaurantHomePage />,
              },
            ],
          },

          // Admin Routes
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
                element: <AllUsers />,
              },
              {
                path: "payments", // /dashboard/restaurants
                element: <AllPaymentsPage />,
              },
              {
                path:"/admin/coupons",
                element:<CouponCreate/>,
              },
              {
                path:"/admin/restaurants",
                element:<RestaurantVerification/>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Route;
