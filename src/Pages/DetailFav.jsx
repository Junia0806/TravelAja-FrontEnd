/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import garuda from "../assets/destinasi/garuda.png";
import { FaPlane } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const DetailFav = () => {
  const [booking, setBooking] = useState({
    bookingCode: "AB123456",
    time: "10:00 AM",
    date: "2023-06-01",
    originTerminal: "Terminal 1",
    destinationTerminal: "Terminal 2",
    airlineInfo: "Garuda Indonesia",
    baggage: "20 kg",
    cabin: "Economy",
    arrivalTime: "12:00 PM",
    arrivalAirport: "Soekarno-Hatta International Airport",
    paymentMethod: "Credit Card",
    priceDetails: {
      hargaPerOrang: 1500000,
      hargaDiskon: 1200000,
    },
    fasilitas: {
      wifi: "Tersedia",
      snack: "Tersedia",
    },
  });
  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(50px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  return (
    <div className="container max-w-5xl mx-auto my-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg">Detail Destinasi Tervaforite</p>
        </div>

        <div className="relative p-8">
          <img
            src={garuda}
            alt="Logo Maskapai"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          />
          <div className="p-4 md:p-8 space-y-6 relative">
            <div>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900 text-xl">
                  Garuda Indonesia
                </span>{" "}
                - Ekonomi
              </p>
              <p className="text-gray-600">
                Kode Penerbangan:{" "}
                <span className="font-bold text-gray-900">GA-302</span>
              </p>
              <p className="text-gray-600">
                Harga:{" "}
                <span className="font-bold text-gray-900">
                  Rp {booking.priceDetails.hargaDiskon.toLocaleString()}
                </span>{" "}
                <span className="line-through text-gray-500">
                  Rp {booking.priceDetails.hargaPerOrang.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-300" />
        <div className="px-8 md:px-16  py-4 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">07:00</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">3 Maret 2024</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-departure mr-2"></i>
                <span className="font-bold text-gray-900">Soekarno Hatta</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <animated.div
              style={planeAnimation}
              className="flex flex-col items-center"
            >
              <FaPlane  size={30} className="text-[#00B7C2]" />
              <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex justify-center items-center">
                1jam 55menit
              </span>
            </animated.div>
          </div>
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">08:55</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">3 Maret 2024</span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-arrival mr-2"></i>
                <span className="font-bold text-gray-900">Juanda Surabaya</span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 ">
          <hr className="border-gray-300" />
          <div className="p-4 md:p-8 ">
            <h2 className="text-lg font-semibold text-gray-700">Informasi</h2>
            <p className="text-gray-600">
              <i className="fa-solid fa-suitcase mr-2"></i>Bagasi:{" "}
              <span className="font-bold text-gray-900">20kg</span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-box mr-2"></i>Kabin:{" "}
              <span className="font-bold text-gray-900">-</span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-tv mr-2"></i>Hiburan:{" "}
              <span className="font-bold text-gray-900">
                Selama penerbangan
              </span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-wifi mr-2"></i>WiFi:{" "}
              <span className="font-bold text-gray-900">
                {booking.fasilitas.wifi}
              </span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-cookie-bite mr-2"></i>Snack:{" "}
              <span className="font-bold text-gray-900">
                {booking.fasilitas.snack}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            to="/data-penumpang"
            className="flex justify-center items-center w-1/3 text-center bg-[#00B7C2] hover:bg-[#00b8c2e5] text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none transition shadow-lg"
          >
            Pilih
          </Link>
          <Link
            to="/"
            className="flex justify-center items-center w-1/3 text-center bg-gray-800 hover:bg-gray-900 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none transition shadow-lg"
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailFav;
