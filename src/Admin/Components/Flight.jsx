import React from "react";

const Flight = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Flight</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Flight Number</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Airline</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Departure</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Create Flight
        </button>
      </form>
    </div>
  );
};

export default Flight;
