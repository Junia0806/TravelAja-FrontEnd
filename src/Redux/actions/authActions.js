import axios from "axios";
import { toast } from "react-toastify";
import {
  setToken,
  setLogin,
  setIsLoggedIn,
  setUser,
} from "../reducers/authReducers";

// Fungsi untuk mendapatkan token dari state Redux
const getToken = (getState) => {
  const state = getState();
  return state.auth.token;
};

export const getMe =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (!token) return;

      const response = await axios.get(
        `https://expressjs-develop.up.railway.app/api/v1/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(setUser(data));

      // jika parameter navigasiPath false/null/undifined, maka tidak akan dieksekusi
      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Jika token tidak valid
        if (error.response.status === 401) {
          dispatch(logout(null));

          // jika parameter navigasiPathError false/null/undifined, maka tidak akan dieksekusi
          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const registerUser = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `https://expressjs-develop.up.railway.app/api/v1/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    console.log("responseRegister", response);

    navigate("/otp", {
      state: {
        email: data.email,
        success: response.data.message,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const verifyOtp = (otp, navigate) => async (dispatch, getState) => {
  try {
    const token = getToken(getState);
    let config = {
      method: "post",
      url: `https://expressjs-develop.up.railway.app/api/v1/verify-otp`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Menambahkan header Authorizatio
      },
      data: { otp },
    };
    console.log("headers", config);
    console.log("cek otp:", { otp });

    const response = await axios.request(config);
    const { token: newToken } = response.data;

    dispatch(setToken(newToken));
    console.log("responseOTPVerifikasi", response.data);
    navigate("/login", {
      state: {
        success: response.data.message,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const renewOtp = (email) => async () => {
  try {
    let config = {
      method: "post",
      url: `https://expressjs-develop.up.railway.app/api/v1/renew-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email },
    };
    const response = await axios.request(config);

    toast.success(response.data.message);
    console.log("responseRenewotp", response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `https://expressjs-develop.up.railway.app/api/v1/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    console.log("response", response);
    dispatch(setLogin("Sedang login"));
    dispatch(setIsLoggedIn(true));
    dispatch(setToken(token));

    dispatch(getMe(null, null, null));

    navigate("/", {
      state: {
        success: response.data.message,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const withGoogleLogin = (accessToken, navigate) => async (dispatch) => {
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://expressjs-develop.up.railway.app/api/v1/google`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("response", response);
    const { token } = response.data.data;
    dispatch(setIsLoggedIn(true));
    dispatch(setToken(token));

    console.log("token", response.data.access_token);
    console.log("responseGoogle", response.data.message);

    toast.success(response.data.message);
    navigate("/");
    // navigate("/", {
    //   state: {
    //     success: response.data.message,
    //   },
    // });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const forgotPassword = (data) => async () => {
  try {
    let config = {
      method: "post",
      url: `https://expressjs-develop.up.railway.app/api/v1/forgot-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    toast.success(response.data.message);
    console.log("responseForgotPassword", response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const resetPassword =
  (password, confirmPassword) => async (dispatch) => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");
      console.log("token", token);

      let config = {
        method: "post",
        url: `https://expressjs-develop.up.railway.app/api/v1/reset-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { password, confirmPassword },
      };
      console.log("config", config);

      const response = await axios.request(config);
      dispatch(setToken(token));
      console.log("responseResetPassword", response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setLogin(null));
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    //toast.success("Logout Berhasil");
    navigate("/", {
      state: {
        success: "Logout berhasil",
      },
    });
  } catch (error) {
    toast.error(error?.message);
  }
};

export const updateProfile =
  (profileData, navigate) => async (dispatch, getState) => {
    try {
      const token = getToken(getState);
      let config = {
        method: "post",
        url: `https://expressjs-develop.up.railway.app/api/v1/updateprofile`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: profileData,
      };

      const response = await axios.request(config);
      console.log("response", response);
      dispatch(setUser(response.data.data)); // Update the user data in the state
      //toast.success("Ubah Profil Berhasil");

      // if (navigate) {
      //   navigate("/profile");
      // }
      navigate("/profile", {
        state: {
          success: response.data.message,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const uploadAvatar = (formData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.post(
      "https://expressjs-develop.up.railway.app/api/v1/uploadavatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("responseAvatar", response);
    if (response.data.status) {
      toast.success(response.data.message);
      dispatch(setUser(response.data.data)); // Update user data with new avatar URL
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Terjadi kesalahan saat mengunggah gambar");
    }
  }
};

export const changePassword =
  (oldPassword, newPassword, navigate) => async (dispatch, getState) => {
    try {
      const token = getToken(getState);
      let config = {
        method: "put",
        url: `https://expressjs-develop.up.railway.app/api/v1/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { oldPassword, newPassword },
      };
      dispatch(setUser());
      const response = await axios.request(config);
      console.log("response", response);

      navigate("/pengaturan", {
        state: {
          success: response.data.message,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };
