/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../Redux/actions/flightAction";
import {
  setFilterCity,
  extractUniqueCities,
} from "../Redux/reducers/flightReducers";
import { Link } from "react-router-dom";

const FlightPromo = () => {
  const dispatch = useDispatch();
  const { flights, loading, filterCity, uniqueCities } = useSelector(
    (state) => state.flights
  );

  useEffect(() => {
    dispatch(fetchFlights()).then(() => {
      dispatch(extractUniqueCities(flights));
    });
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleFilterChange = (city) => {
    dispatch(setFilterCity(city));
  };

  const filteredFlights = filterCity
    ? flights.filter((flight) => flight.arrival_airport.city === filterCity)
    : flights;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mx-auto px-4 py-10 bg-white">
        <h1 className="font-bold text-3xl text-center text-gray-800">
          Promo Penerbangan
        </h1>
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
          {filteredFlights.map(
            (data, index) =>
              data.promotion !== null && (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8"
                >
                  <div className="absolute top-0 right-0 bg-red-700 text-white py-1 px-4 rounded-bl-lg">
                  <p>{data?.flight_id}</p>
                    <p className="text-sm font-semibold">
                      Promo {data.promotion.discount}%{" "}
                    </p>
                  </div>
                  <img
                    src={data.airlines?.url_logo}
                    className="w-full h-40 object-cover"
                    alt="Airline Logo"
                  />
                  <div className="p-4">
                    <p className="font-bold text-center text-xl mb-1 text-black">
                      {data.destination_airport?.city}{" "}
                      <i className="fa-solid fa-arrow-right"></i>{" "}
                      {data.arrival_airport?.city}
                    </p>
                    <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                      <p className="font-medium text-black">
                        <i className="fa-solid fa-plane-circle-check"></i>{" "}
                        {data.airlines?.airline_name}
                      </p>
                      <p className="font-medium text-black">
                        <i className="fa-regular fa-calendar"></i>{" "}
                        {formatDate(data.date)}
                      </p>
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-red-600 font-bold text-lg">
                        Rp.{data.total_price.toLocaleString("id-ID")}
                      </span>{" "}
                      <span className="text-gray-500 line-through">
                        Rp.{data.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <Link
                      to={`/detail/${data.flight_id}`}
                      className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightPromo;
