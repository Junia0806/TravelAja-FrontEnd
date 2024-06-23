import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import foto from "../assets/destinasi/destinasi.jpg";
import { FaPlane } from "react-icons/fa";

const DetailTiket = () => {
  const data = useParams();
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://expressjs-develop.up.railway.app/api/v1/flights/id/${data.id}`);
        setFlight(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!flight) {
    return <div>Data tidak ditemukan</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const calculateFlightDuration = (departure, arrival) => {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
    const durationInMinutes = (arrivalTime - departureTime) / (1000 * 60);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    return `${hours} jam ${minutes} menit`;
  };

  const flightDuration = calculateFlightDuration(flight.departure_time, flight.arrival_time);

  return (
    <div className="container max-w-5xl mx-auto my-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg">
            Detail Tiket Pesawat <strong>{flight?.destination_airport?.city}</strong> <i className="fa-solid fa-arrow-right"></i>
            <strong>{flight?.arrival_airport?.city}</strong>
          </p>
        </div>

        <div className="relative p-8">
          <img src={flight?.airlines?.url_logo || foto} alt="Logo Maskapai" className="absolute top-0 left-0 w-full h-full object-cover opacity-20" />
          <div className="p-4 md:p-8 space-y-6 relative">
            <div>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900 text-xl">{flight?.airlines?.airline_name}</span> - {flight?.seatclass?.seat_class_type}
              </p>
              <p className="text-gray-600">
                Kode Penerbangan: <span className="font-bold text-gray-900">{flight?.flight_id}</span>
              </p>
              <p className="text-gray-600">
                Harga: <span className="font-bold text-gray-900">Rp {flight?.total_price}</span>
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-300" />
        <div className="px-8 md:px-16 py-4 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">{formatTime(flight?.departure_time)}</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">{formatDate(flight?.departure_time)}</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-departure mr-2"></i>
                <span className="font-bold text-gray-900">{flight?.destination_airport?.airport_name}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <FaPlane size={30} className="text-[#00B7C2]" />
            <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex justify-center items-center">{flightDuration}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">{formatTime(flight?.arrival_time)}</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">{formatDate(flight?.arrival_time)}</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-arrival mr-2"></i>
                <span className="font-bold text-gray-900">{flight?.arrival_airport?.airport_name}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 ">
          <hr className="border-gray-300" />
          <div className="p-4 md:p-8 ">
            <h2 className="text-lg font-semibold text-gray-700">Informasi</h2>
            <p className="text-gray-600">
              <i className="fa-solid fa-suitcase mr-2"></i>Bagasi: <span className="font-bold text-gray-900">{flight?.airlines?.baggage} kg</span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-box mr-2"></i>Kabin: <span className="font-bold text-gray-900">{flight?.airlines?.cabin_baggage} kg</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link to={"/"} className="flex justify-center items-center w-1/3 text-center bg-[#00B7C2] hover:bg-gray-900 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none transition shadow-lg">
            Kembali
          </Link>
          <Link to={`/booking/${data.id}`} className="flex justify-center items-center w-1/3 text-center bg-gray-800 hover:bg-gray-900 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none transition shadow-lg">
            Pesan Penerbangan
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DetailTiket;
