import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import airplaneImage from "../assets/auth/airplane.jpg";
import {
  setShowPassword,
  setShowConfirmPassword,
} from "../Redux/reducers/authReducers";
import { resetPassword } from "../Redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.auth.showPassword);
  const showConfirmPassword = useSelector(
    (state) => state.auth.showConfirmPassword
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, [location, navigate]);

  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  const toggleConfirmPasswordVisibility = () => {
    dispatch(setShowConfirmPassword());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[A-Z]/.test(password)) {
      toast.error("Password harus dimulai dengan huruf kapital.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password harus memiliki minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sesuai.");
      return;
    }

    dispatch(resetPassword(password, confirmPassword));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
        <div
          className="hidden md:flex w-full md:w-1/2 bg-blue-500 text-white p-8 rounded-t-lg md:rounded-t-none md:rounded-l-lg flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${airplaneImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold ml-2">TravelAja</h2>
          </div>
          <p className="text-xl mb-2">Rekan Perjalanan Anda</p>
        </div>
        <div className="w-full md:w-1/2 p-8 rounded-b-lg md:rounded-b-none md:rounded-r-lg flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Masukkan password baru untuk akun anda
          </p>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Masukkan Password Baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-4 flex items-center text-lg text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Konfirmasi Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Masukkan Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-4 flex items-center text-lg text-gray-400 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
