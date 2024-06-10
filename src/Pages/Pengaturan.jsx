import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCog,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  setShowConfirmPassword,
  setShowPassword,
  setShowNewPassword,
} from "../Redux/reducers/authReducers";
import { changePassword, getMe } from "../Redux/actions/authActions";

function Pengaturan() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const showPassword = useSelector((state) => state.auth.showPassword);
  const showConfirmPassword = useSelector(
    (state) => state.auth.showConfirmPassword
  );
  const showNewPassword = useSelector((state) => state.auth.showNewPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  const toggleConfirmPasswordVisibility = () => {
    dispatch(setShowConfirmPassword());
  };

  const toggleNewPasswordVisibility = () => {
    dispatch(setShowNewPassword());
  };

  useEffect(() => {
    dispatch(getMe(null, null, null));
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: true });
    }
  }, [location, navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const validateNewPassword = (password) => {
    if (password.length < 8) {
      return "Password harus memiliki minimal 8 karakter";
    }
    if (!/^[A-Z]/.test(password)) {
      return "Password harus diawali dengan huruf kapital";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Semua bidang harus diisi");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("Password baru tidak boleh sama dengan password lama");
      return;
    }

    const passwordValidationError = validateNewPassword(newPassword);
    if (passwordValidationError) {
      toast.error(passwordValidationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    dispatch(changePassword(oldPassword, newPassword, navigate));

    // Clear the input fields after submission
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto px-4 sm:px-8 py-4">
        {/* Top Bar */}
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-blue-500 hover:text-gray-800"
            onClick={() => handleNavigate("/")}
          >
            <FaArrowLeft className="mr-2" /> Beranda
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 justify-center">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                  className="flex items-center w-full text-gray-700 hover:text-blue-500"
                  onClick={() => handleNavigate("/profile")}
                >
                  <FaUserEdit className="mr-2" /> Ubah Profil
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                  className="flex items-center w-full text-gray-700 hover:text-blue-500"
                  onClick={() => handleNavigate("/pengaturan")}
                >
                  <FaCog className="mr-2" /> Pengaturan Akun
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button className="flex items-center w-full text-gray-700 hover:text-blue-500">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="w-full max-w-sm">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Pengaturan Password
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">Password Lama</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Password Lama"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-3 top-4 mt-3 flex items-center text-lg text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">Password Baru</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Password Baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-3 top-4 mt-3 flex items-center text-lg text-gray-400 cursor-pointer"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Konfirmasi Password Baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-3 top-4 mt-3 flex items-center text-lg text-gray-400 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengaturan;
