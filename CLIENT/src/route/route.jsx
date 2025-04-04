import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout.jsx";
import HomePage from "../components/shared/HomePage.jsx";
import Login from "../components/shared/Login.jsx";
import RestaurantListingPage from "../pages/RestaurantListingPage";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import RestaurantPage from "../pages/RestaurantPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import SignupPage from "../components/shared/SignupPage.jsx";
import UserProfilePage from "../pages/UserProfilePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
// import FoodCardPage from "../pages/FoodCardPage";
// import SignOutPage from "../components/shared/SignOutPage";
import LandPage from "../pages/LandPage.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx"
import MenuPage from "../pages/Menu.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import UpdateAddressPage from "../pages/UpdateAddressPage.jsx";
import OrdersPage from "../pages/OrdersPage.jsx";
// import DiscountListing from "..DiscountListing/components/DiscountListing"


const route = createBrowserRouter([

 {
    path: "/",
    element: <Userlayout />,
    
    
    children: [
      {
        path: "",
        element: <LandPage />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        element: <ProtectRoutes />,
        children: [
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "restaurants",
            element: <RestaurantListingPage />,
          },

          {
            path: "about",
            element: <AboutPage />,
          },

          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "restaurant",
            element: <RestaurantPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "/user/restaurant/:id",
            element: <MenuPage/>,
          },
          {
            path: "/pages/paymentPage",
            element: <PaymentPage/>,
          },
          {
            path: "/pages/UpdateAddressPage",
            element: <UpdateAddressPage/>,
          },
          {
            path: "/pages/OrdersPage",
            element: <OrdersPage/>,
          },
        
         
          // {
          //   path: "foodcardpage",
          //   element: <FoodCardPage />,
          // },
          
        ],
      },
    ],
  },
]);

export default route;
