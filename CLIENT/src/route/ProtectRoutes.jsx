import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoutes = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isUserAuth) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [isUserAuth, navigate]);

  return isUserAuth ? <Outlet /> : null;
};

export default ProtectRoutes;
