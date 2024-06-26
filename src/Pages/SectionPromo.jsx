/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PromoPagination = () => {
  const [promotions, setPromotions] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          `https://expressjs-develop.up.railway.app/api/v1/promotion?page=${page}&limit=${4}`
        );
        console.log("API Response:", response.data);
        console.log("API Response:", response.data.data);
        if (response.data && Array.isArray(response.data.data)) {
          setPromotions(response.data.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setPromotions([]);
      }
    };

    fetchPromotions();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); 
    }
  };

  const handleNext = () => {
    setPage(page + 1); 
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="mx-auto px-4 py-10 bg-white">
      <h1 className="font-bold text-3xl text-center text-gray-800 ">
        Promo Penerbangan
      </h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {promotions.length > 0
          ? promotions.map((promotion, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8"
              >
                <div className="absolute top-0 right-0 bg-red-700 text-white py-1 px-4 rounded-bl-lg">
                  <p className="text-sm font-semibold">
                    {promotion?.seatclass?.seat_class_type} -
                    {promotion.promotion.discount}%{" "}
                  </p>
                </div>
                <div className="h-48 w-full object-cover bg-white">
                  <img
                    src={promotion?.airlines?.url_logo}
                    className="h-48 w-full"
                    alt="Airline Logo"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-1 text-black">
                    {promotion.destination_airport?.city}{" "}
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    {promotion.arrival_airport?.city}
                  </p>
                  <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                    <p className="font-medium text-black">
                      <i className="fa-solid fa-plane-circle-check"></i>{" "}
                      {promotion.airlines?.airline_name}
                    </p>
                    <p className="font-medium text-black">
                      <i className="fa-regular fa-calendar"></i>{" "}
                      {formatDate(promotion.date)}
                    </p>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-red-600 font-bold text-lg">
                      Rp.{promotion.total_price.toLocaleString("id-ID")}
                    </span>{" "}
                    <span className="text-gray-500 line-through">
                      Rp.{promotion.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Link
                    to={`/detail/${promotion.flight_id}`}
                    className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 mr-2 bg-gray-800  text-white rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center h-10"
        >
          <i className="fa-solid fa-backward mr-1"></i>
        </button>
        <div className="border border-gray-300 rounded px-4 py-2 mx-2 h-10 flex items-center">
          {page}
        </div>
        <button
          onClick={handleNext}
          disabled={promotions.length === 0 || promotions.length < 4} 
          className="px-4 py-2 ml-2 bg-gray-800  text-white rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center h-10"
        >
          <i className="fa-solid fa-forward ml-1"></i>
        </button>
      </div>
    </div>
  );
};

export default PromoPagination;
