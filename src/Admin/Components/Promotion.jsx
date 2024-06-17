import React from "react";

const Promotion = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Promotion</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Promotion Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Details</label>
          <textarea className="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Create Promotion
        </button>
      </form>
    </div>
  );
};

export default Promotion;
