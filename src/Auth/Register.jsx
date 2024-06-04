import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import airplaneImage from "../assets/auth/airplane.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setShowPassword,
  setShowConfirmPassword,
} from "../Redux/reducers/authReducers";
import { registerUser } from "../Redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.auth.showPassword);
  const showConfirmPassword = useSelector(
    (state) => state.auth.showConfirmPassword
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  const toggleConfirmPasswordVisibility = () => {
    dispatch(setShowConfirmPassword());
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Password dan Konfir Password tidak sama !");
      return;
    }

    if (!validatePassword(password)) {
      toast.warning(
        "Password harus diawali dengan huruf kapital dan minimal 8 karakter!"
      );
      return;
    }

    let data = {
      name,
      email,
      no_telp,
      password,
    };
    console.log("DataInputan", data);
    dispatch(registerUser(data, navigate));
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
          }}
        >
          <h2 className="text-3xl font-bold mb-4">TravelAja</h2>
          <p className="text-xl mb-2">Your Traveling Partner</p>
        </div>
        <div className="w-full md:w-1/2 p-8 rounded-b-lg md:rounded-b-none md:rounded-r-lg flex flex-col justify-center relative">
          <button
            className="md:hidden absolute top-4 left-4 text-blue-500 mb-10"
            onClick={() => navigate("/login")}
          >
            <FaArrowLeft size={20} />
          </button>

          <h2 className="text-2xl font-bold ml-3 mt-3">Daftar</h2>
          <p className="text-gray-600 mb-4 ml-3">
            Silakan anda daftar terlebih dahulu.
          </p>
          <form className="px-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nama
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: johnwick@gmail.com"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                No. Telepon
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                name="no_telp"
                value={no_telp}
                onChange={(e) => setNo_telp(e.target.value)}
                placeholder="Masukkan no. handphone"
              />
            </div>
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
              />
              <div
                className="absolute inset-y-0 right-3 top-4 flex items-center text-lg mt-3 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Konfirmasi Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan kembali password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-3 top-4 flex items-center text-lg mt-3 text-gray-400 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-blue-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full"
                type="submit"
              >
                Daftar
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-sm mt-3">
            Sudah punya akun?{" "}
            <a href="/login" className="text-purple-500 hover:text-purple-700">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
