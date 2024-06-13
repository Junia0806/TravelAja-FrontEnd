import React from "react";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
