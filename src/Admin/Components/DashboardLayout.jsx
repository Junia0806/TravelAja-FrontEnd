import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children, adminName }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          <FaUserCircle className="text-2xl mr-2" />
          <span>{adminName}</span>
          <button className="ml-4 flex items-center text-white hover:text-gray-300">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-blue-600 text-white flex-shrink-0">
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/promotion"
                  activeClassName="font-bold"
                  className="flex items-center hover:bg-gray-200"
                >
                  Promotions
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/seatclass"
                  activeClassName="font-bold"
                  className="flex items-center"
                >
                  Seat Class
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/airline"
                  activeClassName="font-bold"
                  className="flex items-center"
                >
                  Airlines
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/flight"
                  activeClassName="font-bold"
                  className="flex items-center"
                >
                  Flights
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
