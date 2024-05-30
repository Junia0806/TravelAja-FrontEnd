import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withGoogleLogin } from "../Redux/actions/authActions";
import { FaGoogle } from "react-icons/fa";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      console.log("Google login success response:", responseGoogle);
      dispatch(withGoogleLogin(responseGoogle.access.token, navigate));
    },
    onFailure: (error) => {
      console.error("Google login failed:", error);
    },
    //flow: "auth-code", // Menggunakan authorization code flow
  });

  return (
    <button
      type="button"
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center w-full mb-2"
      onClick={() => loginWithGoogle()}
    >
      {buttonText} <FaGoogle className="mr-2" />
      Masuk dengan Google
    </button>
  );
}

export default GoogleLogin;
