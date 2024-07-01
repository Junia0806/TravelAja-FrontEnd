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
import RiwayatPemesanan from "./Components/riwayatpemesanan.jsx";
import { Pencarian } from "./Components/pencarian.jsx";
import DetailRiwayat from "./Components/detailriwayat.jsx";
import Sukses from "./Status/SuksesPage.jsx";
import About from "./Pages/About.jsx";
import Pengaturan from "./Pages/Pengaturan.jsx";
import AdminDashboard from "./Admin/Pages/AdminDashboard.jsx";
import DetailPenerbangan from "./Pages/DetailPage.jsx";
import Protected from "./Components/Protected.jsx";
import Proces from "./Booking/BookingStep1.jsx";
import Bayar from "./Booking/BookingStep2.jsx";
import Cancel from "./Status/CancelPage.jsx";
import Pending from "./Status/PendingPage.jsx";
import BoardingPass from "./Pages/TiketPage.jsx";

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
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailPenerbangan />} />
        <Route
          path="/proces/:id"
          element={
            <Protected>
              <Proces />
            </Protected>
          }
        />
        <Route
          path="/bayar/:id"
          element={
            <Protected>
              <Bayar />
            </Protected>
          }
        />
        <Route
          path="/status/:id"
          element={
            <Protected>
              <Sukses />
            </Protected>
          }
        />
        <Route
          path="/cancel/:id"
          element={
            <Protected>
              <Cancel />
            </Protected>
          }
        />
        <Route
          path="/pending/:id"
          element={
            <Protected>
              <Pending />
            </Protected>
          }
        />
        <Route
          path="/tiket/:id"
          element={
            <Protected>
              <BoardingPass />
            </Protected>
          }
        />
        <Route
          path="/riwayat"
          element={
            <Protected>
              <RiwayatPemesanan />
            </Protected>
          }
        />
        <Route
          path="/detailriwayat/:booking_code"
          element={<DetailRiwayat />}
        />
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
