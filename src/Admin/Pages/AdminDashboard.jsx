// src/Admin/Pages/AdminDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/SideBar";
import AdminHeader from "../Components/AdminHeader";
import Promotion from "../Components/Promotion";
import Airline from "../Components/Airline";
import Flight from "../Components/Flight";
import Airports from "../Components/Airports";
import Dashboard from "../Components/DashboardLayout";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/airlines" element={<Airline />} />
            <Route path="/flights" element={<Flight />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/airports" element={<Airports />} />
            {/* Default route */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
