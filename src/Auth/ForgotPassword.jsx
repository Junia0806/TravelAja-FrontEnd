import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../Redux/actions/authActions";
import airplaneImage from "../assets/auth/airplane.jpg";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
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
          <h2 className="text-2xl font-bold">Lupa Password</h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Masukkan email yang terdaftar untuk menerima link reset password.
          </p>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
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
                placeholder="Contoh: johnwick@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-blue-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full"
                type="submit"
              >
                Kirim Link
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-sm w-full mt-4">
            Sudah ingat password Anda?{" "}
            <a href="/login" className="text-purple-500 hover:text-purple-700">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
