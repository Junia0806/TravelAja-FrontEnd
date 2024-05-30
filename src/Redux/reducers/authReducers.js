import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  showPassword: false,
  showConfirmPassword: false,
  verifId: null,
  login: null,
  user: null,
  token: null,
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
    setVerifId: (state, action) => {
      state.verifId = action.payload;
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
  },
});

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
export const {
  setShowPassword,
  setShowConfirmPassword,
  setVerifId,
  setLogin,
  setUser,
  setToken,
} = authSlice.actions;

export default persistedAuthReducer;
