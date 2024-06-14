/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const Home1 = () => {
  const [flightData, setFlightData] = useState(null);
  const [searchParams, setSearchParams] = useState({
    arrival_airport_id: "CGK",
    destination_airport_id: "LOP",
    date: "2024-06-05",
    seat_class_id: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://expressjs-develop.up.railway.app/api/v1/search`;
    try {
      const response = await axios.get(url, { params: searchParams });
      setFlightData(response.data.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="departureAirport" className="text-gray-700">
            Destinasi Airport:
          </label>
          <input
            type="text"
            id="departureAirport"
            name="destination_airport_id"
            value={searchParams.destination_airport_id}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="arrivalAirport" className="text-gray-700">
            Arrival Airport:
          </label>
          <input
            type="text"
            id="arrivalAirport"
            name="arrival_airport_id"
            value={searchParams.arrival_airport_id}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="departureDate" className="text-gray-700">
            Departure Date:
          </label>
          <input type="date" id="departureDate" name="date" value={searchParams.date} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="seatClass" className="text-gray-700">
            Seat Class:
          </label>
          <select id="seatClass" name="seat_class_id" value={searchParams.seat_class_id} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Economy</option>
            <option value="2">Business</option>
            <option value="3">First</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Search
        </button>
      </form>
      {flightData && (
        <div>
          <h2 className="text-xl font-bold mt-8">Hasil Pencarian:</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {flightData.map((flight, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                <p>Flight ID: {flight.flight_id}</p>
                <p>Harga: {flight.price}</p>
                <p>Berangkat dari: {flight.destination_airport.id}</p>
                <p>Tujuan: {flight.arrival_airport.id}</p>
                <p>Tanggal Berangkat: {flight.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home1;
