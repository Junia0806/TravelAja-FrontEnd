import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store.js";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import Login from "./Auth/LoginPage";
import Register from "./Auth/Register";
import OtpVerification from "./Auth/OtpVerification";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="1030250831924-qgnngn1qb3do2p5p25v6ap7hnfsfisca.apps.googleusercontent.com">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<OtpVerification />} />
              <Route path="/lupa" element={<ForgotPassword />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/pencarian" element={<Pencarian />} />
              <Route path="/detailtiket" element={<DetailTiket />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
