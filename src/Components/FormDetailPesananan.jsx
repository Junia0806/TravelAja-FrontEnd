/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailPemesanan = () => {
  const id = useParams();
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('data :>> ', id.id);
  console.log("flight :>> ", flight);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://expressjs-develop.up.railway.app/api/v1/flights/${id.id}`
        );
        setFlight(response.data.data);
        console.log('response.data :>> ', response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // const totalHarga = details.priceDetails.hargaPerOrang * details.priceDetails.jumlahPenumpang;

  return (
    <div className="container mx-auto p-4">
      <div className="mx-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-l font-semibold">Detail Pesanan</p>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <span className="block text-gray-600">
              <i className="fa-solid fa-clock mr-2"></i>
              {formatTime(flight?.departure_time)} <i className="fa-solid fa-calendar mr-2"></i>
            {formatDate(flight?.departure_time)}
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane-departure mr-2"></i>
              {flight?.destination_airport?.airport_name}
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane-arrival mr-2"></i>
              {flight?.arrival_airport?.airport_name}
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane mr-2"></i>
              {flight?.airlines?.airline_name} | {flight?.flight_id}
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-chair mr-2"></i>
              {flight?.seatclass?.seat_class_type}
            </span>
            <hr className="border-1 border-gray-200 mt-3"></hr>
          </div>
          <div className="mb-6">
            <strong className="text-gray-800">Informasi:</strong>
            <div className="ml-4 text-gray-600">
              <div>
                <i className="fa-solid fa-briefcase mr-2"></i>
                Kabin: {flight?.airlines?.cabin_baggage} kg
              </div>
              <div>
                <i className="fa-solid fa-luggage-cart mr-2"></i>
                Bagasi: {flight?.airlines?.baggage} kg
              </div>
            </div>
            <hr className="border-1 border-gray-200 mt-3"></hr>
          </div>
          <div className="mb-6">
            <strong className="text-gray-800">Rincian Harga:</strong>
            <div className="ml-4 text-gray-600">
              <div className="mb-2">
                <i className="fa-solid fa-user mr-2"></i>
                Jumlah Penumpang:{" "}
                <span className="text-gray-800 font-semibold">1 Orang</span>
              </div>
              <div className="mb-2">
                <i className="fa-solid fa-ticket mr-2"></i>
                Harga per Orang:{" "}
                <span className="text-gray-800 font-semibold">Rp.{flight.total_price.toLocaleString("id-ID")}</span>
              </div>
              <div className="border-t border-gray-300 mt-2 pt-2">
                <i className="fa-solid fa-dollar-sign mr-2"></i>
                Total:{" "}
                <span className="text-gray-800 font-bold text-xl">Rp.{flight.total_price.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <Link to="/bayar" className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Lanjut Pembayaran
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPemesanan;
