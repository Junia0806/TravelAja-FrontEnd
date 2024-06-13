import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlane,
  FaTicketAlt,
  FaUser,
  FaTags,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">Admin Dashboard</div>
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 text-xl font-bold md:block hidden">
          Admin Dashboard
        </div>
        <nav className="mt-10">
          <Link
            to="/admin/airlines"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaPlane className="inline-block mr-2" /> Airlines
          </Link>
          <Link
            to="/admin/flights"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaTicketAlt className="inline-block mr-2" /> Flights
          </Link>
          <Link
            to="/admin/promotions"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaTags className="inline-block mr-2" /> Promotions
          </Link>
          <Link
            to="/admin/airports"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="inline-block mr-2" /> Airports
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
