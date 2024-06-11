/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import foto from "../assets/destinasi/destinasi.jpg"; 

const HomeCoba = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCity, setFilterCity] = useState("");
  const [uniqueCities, setUniqueCities] = useState([]);

  console.log("flights :>> ", flights);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://expressjs-develop.up.railway.app/api/v1/flights"
        );
        setFlights(response.data.data);
        setIsLoading(false);
        extractUniqueCities(response.data.data);
        console.log("response data", response.data.data);
        console.log("message", response.data.message);
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const extractUniqueCities = (flights) => {
    const cities = flights.map(flight => flight.arrival_airport.city);
    const uniqueCities = [...new Set(cities)];
    setUniqueCities(uniqueCities);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleFilterChange = (city) => {
    setFilterCity(city);
  };

  const filteredFlights = filterCity 
    ? flights.filter(flight => flight.arrival_airport.city === filterCity)
    : flights;

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-landing">
        <div className="max-w-5xl w-full mx-auto mt-5 p-8 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-center flex-grow text-white">
              PENCARIAN PENERBANGAN
              <i className="fa-solid fa-plane-up"></i>
            </h2>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-10 bg-white">
        <h1 className="font-bold text-3xl text-center text-gray-800">
          Destinasi Terfavorite
        </h1>
        {/* Button Filter */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-10">
        <button
            onClick={() => handleFilterChange("")}
            className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center"
          >
            <i className="fa-solid fa-magnifying-glass mr-2"></i> Semua
          </button>
          {uniqueCities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(city)}
              className={`bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center ${
                filterCity === city ? "bg-gray-800" : ""
              }`}
            >
              <i className="fa-solid fa-magnifying-glass mr-2"></i> {city}
            </button>
          ))}
         
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFlights.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            >
              <div className="bg-[#00B7C2] text-white py-1 px-4 rounded-t-lg">
                <p className="text-center text-sm font-semibold">
                  Destinasi {data?.destination_airport?.city}
                </p>
              </div>
              <img
                src={data?.airlines?.url_logo || foto}
                className="w-full h-40 object-cover"
                alt="Airline Logo"
              />
              <div className="p-4">
                <p className="font-bold text-center text-xl mb-1 text-black">
                  {data?.destination_airport?.city}{" "}
                  <i className="fa-solid fa-arrow-right"></i>{" "}
                  {data?.arrival_airport?.city}
                </p>
                <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                  <p className="font-medium text-black">
                    <i className="fa-solid fa-plane-circle-check"></i>{" "}
                    {data?.airlines?.airline_name}
                  </p>
                  <p className="font-medium text-black">
                    <i className="fa-regular fa-calendar"></i>{" "}
                    {formatDate(data.date)}
                  </p>
                </div>
                <div className="text-center mb-4">
                  <p className="text-gray-500 line-through">
                    Harga Normal: Rp {data.price}
                  </p>
                  <p className="text-red-600 font-bold text-lg">
                    Harga Diskon: Rp {data.total_price}
                  </p>
                </div>
                <Link
                  to={`/detail/${data.flight_id}`}
                  className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCoba;
