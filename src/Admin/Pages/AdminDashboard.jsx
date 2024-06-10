import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../Components/DashboardLayout";
import Promotion from "../Components/Promotion";
import SeatClass from "../Components/SeatClass";
import Airline from "../Components/Airline";
import Flight from "../Components/Flight";

const AdminDashboard = () => {
  return (
    <DashboardLayout adminName="Admin ">
      <Routes>
        <Route path="promotion" element={<Promotion />} />
        <Route path="seatclass" element={<SeatClass />} />
        <Route path="airline" element={<Airline />} />
        <Route path="flight" element={<Flight />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
