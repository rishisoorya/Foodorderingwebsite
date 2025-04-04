import React from "react";
import { RouterProvider } from "react-router-dom";
import route from "./route/route.jsx";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      {/* <route path="/" element={<RestaurantListingPage />} />
      <route path="/user/restaurant/:id" element={<MenuPage />} /> */}
      <RouterProvider router={route} />
      <Toaster />
      
    </>
  );
}

export default App;
