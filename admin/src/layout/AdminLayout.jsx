import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../config/axiosInstance.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearUserdata, saveUserData } from "../redux/features/userSlice";

const AdminLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      // Check if current path is under "/admin" or not
      const isAdminRoute = location.pathname.startsWith("/admin");
      const url = isAdminRoute ? "/check/admin" : "/check/restaurant";

      const response = await axiosInstance.get(url);
      console.log(response, "response=======");
      dispatch(saveUserData(response?.data));
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

export default AdminLayout;