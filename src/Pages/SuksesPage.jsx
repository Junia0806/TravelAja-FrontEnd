/* eslint-disable no-unused-vars */
import React from "react";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import bg from "../assets/destinasi/pesawat.png";
import { Link } from "react-router-dom";

const Sukses = () => {
  return (
    <div className="m-5 lg:mx-20 md:mx-10">
      <div className="mb-6">
        <div className="flex items-center justify-around">
          <span className="flex items-center text-gray-800 font-bold">
            <FaUserPen className="mr-2 text-[#00B7C2]" /> Data
          </span>
          <div className="flex items-center text-gray-800 font-bold">
            <MdOutlinePayment className="mr-2 text-[#00B7C2]" /> Bayar
          </div>
          <div className="flex items-center text-gray-800 font-bold">
            <FaCheckCircle className="mr-2 text-[#00B7C2]" /> Selesai
          </div>
        </div>
        <div className="relative mt-4">
          <div className="absolute w-full bg-[#00B7C2] h-1"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 min-h-screen">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Selamat</h1>
        <p className="text-2xl text-gray-800 pb-12 text-center">
          Yeay! Pemesanan Tiket Berhasil
        </p>
        <img
          className="h-72 w-auto mx-auto rounded-lg mb-4"
          src={bg}
          alt="Background Image"
        />
        <Link
          to="/tiket"
          className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          Cetak Tiket
        </Link>
      </div>
    </div>
  );
};

export default Sukses;