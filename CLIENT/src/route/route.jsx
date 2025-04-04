import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import HomePage from "../components/shared/HomePage";
import Login from "../components/shared/Login";
import RestaurantListingPage from "../pages/RestaurantListingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import RestaurantPage from "../pages/RestaurantPage";
import CartPage from "../pages/CartPage";
import SignupPage from "../components/shared/SignupPage";
import UserProfilePage from "../pages/UserProfilePage";
import ErrorPage from "../pages/ErrorPage";
// import FoodCardPage from "../pages/FoodCardPage";
// import SignOutPage from "../components/shared/SignOutPage";
import LandPage from "../pages/LandPage";
import ProtectRoutes from "./ProtectRoutes";
import AdminDashboard from "../pages/admin/AdminDashboard"
import MenuPage from "../pages/Menu";
import PaymentPage from "../pages/PaymentPage.jsx"
import UpdateAddressPage from "../pages/UpdateAddressPage.jsx";
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
