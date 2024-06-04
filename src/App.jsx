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
import Profile from "./Pages/Profile.jsx";
import NotificationsPage from "./Pages/Notifications.jsx";
import Home from "./Pages/HomePage";
import Header from "./Components/Navbar";
import FooterSection from "./Components/Footer";
import DataDiri from "./Pages/DataDiriPage";
import Bayar from "./Pages/BayarPage";
import { RiwayatPemesanan } from "./Components/riwayatpemesanan.jsx";
import { Pencarian } from "./Components/pencarian.jsx";
import { DetailTiket } from "./Components/detailtiket.jsx";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="1030250831924-qgnngn1qb3do2p5p25v6ap7hnfsfisca.apps.googleusercontent.com">
          <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pencarian" element={<Pencarian />} />
              <Route path="/detail" element={<DetailTiket />} />
              <Route path="/data-penumpang" element={<DataDiri />} />
              <Route path="/bayar" element={<Bayar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<OtpVerification />} />
              <Route path="/lupa" element={<ForgotPassword />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notif" element={<NotificationsPage />} />
              <Route path="/riwayat" element={<RiwayatPemesanan/>} />
            </Routes>
            <FooterSection />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
