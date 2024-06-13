import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Users Registered</h2>
        <p className="mt-4 text-3xl">1200</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Tickets Sold</h2>
        <p className="mt-4 text-3xl">300</p>
      </div>
    </div>
  );
};

export default Dashboard;
