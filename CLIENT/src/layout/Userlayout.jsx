import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Userheader from "../components/shared/Userheader.jsx";
import Header from "../components/shared/Header.jsx";
import Footer from "../components/shared/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearUserdata, saveUserData } from "../redux/features/userSlice.js";
import axiosInstance from "../axios/axiosInstance.js";

const UserLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/check/user",
      });
      dispatch(saveUserData());
    } catch (error) {
      console.error(error);
      dispatch(clearUserdata());
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div>
      <header>{isUserAuth ? <Userheader /> : <Header />}</header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
