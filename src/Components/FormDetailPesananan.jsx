/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const DetailPemesanan = () => {
  const details = {
    waktu: "10:00 AM",
    tanggal: "2024-06-15",
    bandaraAsal: "Soekarno-Hatta International Airport",
    bandaraTujuan: "Ngurah Rai International Airport",
    namaMaskapai: "Garuda Indonesia",
    kodeMaskapai: "GA123",
    kelas: "Ekonomi",
    informasi: {
      cabin: "7 kg",
      bagasi: "20 kg",
    },
    priceDetails: {
      adult: 1500000,
      child: 750000,
      total: 3750000,
    },
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="mx-8 bg-white shadow-lg rounded-lg outline-1">
          <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
            <p className="text-center text-l font-semibold">Detail Pesanan</p>
          </div>
          <div className="p-8">
            <div className="mb-4">
              <span className="block text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                {details.waktu} <i className="fa-solid fa-calendar mr-2"></i>
                {details.tanggal}
              </span>
              <span className="block text-gray-600">
                <i className="fa-solid fa-plane-departure mr-2"></i>
                {details.bandaraAsal}
              </span>
              <span className="block text-gray-600">
                <i className="fa-solid fa-plane-arrival mr-2"></i>
                {details.bandaraTujuan}
              </span>
              <span className="block text-gray-600">
                <i className="fa-solid fa-plane mr-2"></i>
                {details.namaMaskapai} | {details.kodeMaskapai}
              </span>
              <span className="block text-gray-600">
                <i className="fa-solid fa-chair mr-2"></i>
                {details.kelas}
              </span>
              <hr className=" border-1 border-gray-200 mt-3"></hr>
            </div>
            <div className="mb-4">
              <strong className="text-gray-800">Informasi:</strong>
              <div className="ml-4 text-gray-600">
                <div>
                  <i className="fa-solid fa-briefcase mr-2"></i>
                  Cabin: {details.informasi.cabin}
                </div>
                <div>
                  <i className="fa-solid fa-luggage-cart mr-2"></i>
                  Bagasi: {details.informasi.bagasi}
                </div>
              </div>
              <hr className=" border-1 border-gray-200 mt-3"></hr>
            </div>
            <div className="mb-4">
            <strong className="text-gray-800">Rincian Harga:</strong>
            <div className="ml-4 text-gray-600">
              <div className="mb-2">
                <i className="fa-solid fa-user mr-2"></i>
                2 Dewasa:{" "}
                <span className="text-gray-800 font-bold">Rp. {details.priceDetails.adult * 2}</span>
              </div>
              <div className="mb-2">
                <i className="fa-solid fa-child mr-2"></i>
                1 Anak:{" "}
                <span className="text-gray-800 font-bold">Rp. {details.priceDetails.child * 1}</span>
              </div>
              <div className="border-t border-gray-300 mt-2 pt-2">
                <i className="fa-solid fa-dollar-sign mr-2"></i>
                Total:{" "}
                <span className="text-gray-800 font-bold">Rp. {details.priceDetails.total}</span>
              </div>
            </div>
          </div>
            <Link to="/bayar" className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none">
                   Lanjut Pembayaran
                  </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPemesanan;
