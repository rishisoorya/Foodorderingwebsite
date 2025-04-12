import { useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/login", data);
      const { role } = response.data.user;

      if (role === "admin") {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        toast.error("You are not authorized to access this page.");
        setTimeout(() => {
          window.location.href = "https://foodorderingwebsite-ecru.vercel.app/";
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex justify-center items-center">
      {/* overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-[#000000c5] cursor-pointer"
      />

      {/* Modal */}
      <div className="w-[410px] bg-[#0d0c0f] z-50 rounded-[10px] py-8 px-8 text-white space-y-2 border-gray-400 border-[1px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <div className="mb-2 font-bold text-[14px]">
              <label htmlFor="email">Email</label>
            </div>
            <input
              type="email"
              id="email"
              className="bg-[#08070a] w-full py-2 mb-1 rounded-lg px-3 placeholder:text-gray-700 placeholder:text-[12px] placeholder:font-bold focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-[12px]">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="mb-2 font-bold text-[14px]">
              <label htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              id="password"
              className="bg-[#08070a] py-2 w-full rounded-lg px-3 placeholder:text-gray-700 placeholder:text-[12px] placeholder:font-bold focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="* * * * * * * * * * *"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-[12px]">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white rounded-lg text-gray-800 py-2 font-bold hover:bg-gray-200 transition mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
