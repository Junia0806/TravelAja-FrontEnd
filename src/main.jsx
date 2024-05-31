import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Pencarian } from "./componen/pencarian.jsx";
import { DetailTiket } from "./componen/detailtiket.jsx";
import { RiwayatPemesanan } from "./componen/riwayatpemesanan.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RiwayatPemesanan />
  </React.StrictMode>
);
