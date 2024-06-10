import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import airplaneImage from "../assets/auth/airplane.jpg";
import { setShowPassword } from "../Redux/reducers/authReducers";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.auth.showPassword);
  const [emailOrNoTelp, setemailOrNoTelp] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, [location, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      emailOrNoTelp,
      password,
    });

    dispatch(login(data, navigate));
  };

  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-blue-100 ">
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
            <h2 className="text-3xl font-bold mb-4">TravelAja</h2>
            <p className="text-xl mb-2">Rekan Perjalanan Anda</p>
          </div>
          <div className="w-full md:w-1/2 p-8 rounded-b-lg md:rounded-b-none md:rounded-r-lg flex flex-col justify-center items-center md:items-start">
            <h2 className="text-2xl font-bold">Masuk</h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Selamat datang! Silahkan masuk dengan akun yang terdaftar.
            </p>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email/No.Handphone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Contoh: johnwick@gmail.com"
                  name="emailOrNoTelp"
                  onChange={(e) => setemailOrNoTelp(e.target.value)}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-3 top-4 flex items-center text-lg text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <div className="text-right mb-4">
                <a
                  href="/lupa"
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Lupa password?
                </a>
              </div>
              <div className="mb-6">
                <button
                  className="bg-blue-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full"
                  type="submit"
                >
                  Masuk
                </button>
              </div>
            </form>

            {/* Garis Pembatas */}
            <div className="flex items-center justify-center my-4 w-full">
              <hr className="w-full border-gray-300 border-t-2" />
              <span className="px-2 text-gray-500">atau</span>
              <hr className="w-full border-gray-300 border-t-2" />
            </div>

            {/* <div className="text-center mb-4 w-full">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center w-full">
                <FaGoogle className="mr-2" /> Masuk dengan Google
              </button>
            </div> */}

            <GoogleLogin buttonText />

            <p className="text-center text-gray-500 text-sm w-full">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="text-purple-500 hover:text-purple-700"
              >
                Daftar di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
