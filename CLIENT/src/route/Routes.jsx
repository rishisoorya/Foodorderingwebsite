import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import HomePage from "../components/shared/HomePage";
import LogIn from "../components/shared/login";
import RestaurantListingPage from "../pages/RestaurantListingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import RestaurantPage from "../pages/RestaurantPage";
import CartPage from "../pages/CartPage";
import SignupPage from "../components/shared/SignupPage";
import UserProfilePage from "../pages/UserProfilePage";
// import ErrorPage from "../pages/errorpage";
import FoodCardPage from "../pages/FoodCardPage";
import SignOutPage from "../components/shared/SignOutPage";
import LandPage from "../pages/LandPage";
import ProtectRoutes from "./ProtectRoutes";
// import DiscountListing from "..DiscountListing/components/DiscountListing"

const routes = createBrowserRouter([
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
        element: <LogIn />,
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
          // {
          //   path: "foodcardpage",
          //   element: <FoodCardPage />,
          // },
        ],
      },

      
    ],
  },
]);

export default routes;
