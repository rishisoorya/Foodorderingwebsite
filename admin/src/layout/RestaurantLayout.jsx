import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../config/axiosInstance.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearUserdata, saveUserData } from "../redux/features/userSlice";

const RestaurantLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/check/restaurant",
      });
      console.log(response, "response=======");
      dispatch(saveUserData(response?.data)); // Save user data if needed
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
      {/* Admin layout only renders the Outlet for nested routes */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RestaurantLayout;
