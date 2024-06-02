/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const DetailRiwayat = () => {
  const details = {
    kodepemesanan: "JS123",
    waktu: "10:00 AM",
    tanggal: "2024-06-15",
    bandaraAsal: "Soekarno-Hatta International Airport",
    bandaraTujuan: "Ngurah Rai International Airport",
    namaMaskapai: "Garuda Indonesia",
    kelas: "Ekonomi",
    informasi: {
      cabin: "7 kg",
      bagasi: "20 kg",
    },
    rincianHarga: {
      totalHarga: "IDR 1,500,000",
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Detail Riwayat Pesanan</h1>
      <div className="container mx-auto p-4">
        <div className="mx-8 bg-white shadow-lg rounded-lg outline-1">
          <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
            <p className="text-center text-l font-semibold">Detail Riwayat Pesanan</p>
          </div>
          <div className="p-8">
            <div className="mb-4 flex justify-between items-center">
              <strong className="text-gray-800">Kode Pemesanan: {details.kodepemesanan}</strong>
              <button className="text-white font-semibold px-4 py-2 rounded-full bg-green-500">Pembayaran Berhasil</button>
            </div>
            <hr className=" border-1 border-gray-200 mb-4 "></hr>
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
                {details.namaMaskapai}
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
                <div>
                  <i className="fa-solid fa-dollar-sign mr-2"></i>
                  <span>Total Harga: </span>
                  <span className="text-gray-800 font-bold">{details.rincianHarga.totalHarga}</span>
                </div>
              </div>
            </div>
            <Link className="block text-center bg-green-500 text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none">Cetak Tiket</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRiwayat;
