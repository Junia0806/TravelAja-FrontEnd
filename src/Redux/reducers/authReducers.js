import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  showPassword: false,
  showConfirmPassword: false,
  showNewPassword: false,
  login: null,
  user: null,
  token: null,
  isLoggedIn: false,
  notification: [],
};

const persistConfig = {
  key: "auth",
  storage: storage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    setShowConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword;
    },
    setShowNewPassword: (state) => {
      state.showNewPassword = !state.showNewPassword;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
export const {
  setShowPassword,
  setShowConfirmPassword,
  setShowNewPassword,
  setLogin,
  setUser,
  setToken,
  setIsLoggedIn,
  setNotification,
} = authSlice.actions;

export default persistedAuthReducer;
