// src/components/Airports.js
import React, { useState } from "react";

const Airports = () => {
  const [airports, setAirports] = useState([
    { id: 1, name: "Soekarno-Hatta", code: "CGK" },
    { id: 2, name: "Ngurah Rai", code: "DPS" },
  ]);

  const [newAirport, setNewAirport] = useState({ name: "", code: "" });

  const addAirport = () => {
    setAirports([...airports, { ...newAirport, id: airports.length + 1 }]);
    setNewAirport({ name: "", code: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Airports</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Airport Name"
          value={newAirport.name}
          onChange={(e) =>
            setNewAirport({ ...newAirport, name: e.target.value })
          }
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Airport Code"
          value={newAirport.code}
          onChange={(e) =>
            setNewAirport({ ...newAirport, code: e.target.value })
          }
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={addAirport}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Code</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td className="py-2 px-4 border-b">{airport.id}</td>
              <td className="py-2 px-4 border-b">{airport.name}</td>
              <td className="py-2 px-4 border-b">{airport.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Airports;
