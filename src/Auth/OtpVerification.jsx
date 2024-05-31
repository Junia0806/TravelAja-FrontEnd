import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { verifyOtp, renewOtp } from "../Redux/actions/authActions";
import { useDispatch } from "react-redux";

const OtpVerification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const [otp, setOtp] = useState(new Array(6).fill());
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { state: { email: email, success: false } });
    }
  }, [location, navigate]);

  const handleChange = (element, index) => {
    //hanya angka
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // input otomatis berikutnya
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const integer = Number(enteredOtp);

    // Validasi untuk memastikan semua input OTP terisi
    if (enteredOtp.length < 6 || otp.includes("")) {
      toast.error("Masukkan OTP");
      return;
    }

    dispatch(verifyOtp(integer, navigate));
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRenewOtp = () => {
    setTimeLeft(60);
    setOtp(new Array(6).fill("")); // Reset OTP input
    dispatch(renewOtp(email));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            OTP Verifikasi
          </h2>
          <p className="text-center mb-6">
            Silakan masukkan OTP (One-Time Password) yang dikirimkan ke email
            Anda <span className="text-blue-500">{email}</span> untuk
            menyelesaikan verifikasi Anda.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4 space-x-2">
              {otp.map((data, index) => (
                <input
                  className="border border-gray-300 rounded w-10 h-10 sm:w-12 sm:h-12 text-center form-control focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Durasi: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
              </span>
              <button
                type="button"
                className="text-sm text-blue-500 hover:underline"
                onClick={handleRenewOtp}
                disabled={timeLeft !== 0}
              >
                Kirim Ulang
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
