/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.js";
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
import Bayar from "./Pages/BayarPage";
import { RiwayatPemesanan } from "./Components/riwayatpemesanan.jsx";
import { Pencarian } from "./Components/pencarian.jsx";
import DetailRiwayat from "./Components/detailriwayat.jsx";
import Sukses from "./Pages/SuksesPage.jsx";
import About from "./Pages/About.jsx";
import Pengaturan from "./Pages/Pengaturan.jsx";
import AdminDashboard from "./Admin/Pages/AdminDashboard.jsx";
import Tiket from "./Pages/TiketPage.jsx";
import Home1 from "./Pages/Coba1.jsx";
import BookingStep1 from "./Booking/BookingStep1.jsx";
import DetailPenerbangan from "./Pages/DetailPage.jsx";

const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    "/login",
    "/register",
    "/otp",
    "/lupa",
    "/reset",
    "/admin",
    "/admin/airports",
    "/admin/airlines",
    "/admin/flights",
    "/admin/promotions",
  ];

  const shouldHideHeaderFooter = noHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bayar" element={<Bayar />} />
        <Route path="/sukses" element={<Sukses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/lupa" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notif" element={<NotificationsPage />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/coba1" element={<Home1 />} />
        <Route path="/detail/:id" element={<DetailPenerbangan />} />
        {/* <Route path="/booking/:id" element={<DataDiri />} /> */}
        <Route path="/booking/:id" element={<BookingStep1 />} />
        <Route path="/detailriwayat" element={<DetailRiwayat />} />
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/riwayat" element={<RiwayatPemesanan />} />
        <Route path="/tiket" element={<Tiket />} />
      </Routes>
      {!shouldHideHeaderFooter && <FooterSection />}
    </>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="1030250831924-qgnngn1qb3do2p5p25v6ap7hnfsfisca.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

export default WrappedApp;
