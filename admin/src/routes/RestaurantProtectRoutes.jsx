import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RestaurantProtectRoutes = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isUserAuth) {
    navigate("/restaurant/login");
  }
  return isUserAuth && <Outlet />;
};

export default RestaurantProtectRoutes;
