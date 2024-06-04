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
    fasilitas: {
      wifi: "Tersedia",
      snack: "Tidak tersedia",
      selimut: "Tersedia",
      hiburan: "Tersedia",
    },
    priceDetails: {
      hargaPerOrang: 1500000,
      jumlahPenumpang: 3,
    },
  };

  const totalHarga = details.priceDetails.hargaPerOrang * details.priceDetails.jumlahPenumpang;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

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
            <hr className="border-1 border-gray-200 mt-3"></hr>
          </div>
          <div className="mb-6">
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
            <hr className="border-1 border-gray-200 mt-3"></hr>
          </div>
          <div className="mb-6">
            <strong className="text-gray-800">Fasilitas:</strong>
            <div className="ml-4 text-gray-600">
              <div>
                <i className="fa-solid fa-wifi mr-2"></i>
                WIFI: {details.fasilitas.wifi}
              </div>
              <div>
                <i className="fa-solid fa-cookie-bite mr-2"></i>
                Snack: {details.fasilitas.snack}
              </div>
              <div>
                <i className="fa-solid fa-bed mr-2"></i>
                Selimut: {details.fasilitas.selimut}
              </div>
              <div>
                <i className="fa-solid fa-tv mr-2"></i>
                Hiburan: {details.fasilitas.hiburan}
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
                <span className="text-gray-800 font-semibold">{details.priceDetails.jumlahPenumpang} Orang</span>
              </div>
              <div className="mb-2">
                <i className="fa-solid fa-ticket mr-2"></i>
                Harga per Orang:{" "}
                <span className="text-gray-800 font-semibold">{formatRupiah(details.priceDetails.hargaPerOrang)}</span>
              </div>
              <div className="border-t border-gray-300 mt-2 pt-2">
                <i className="fa-solid fa-dollar-sign mr-2"></i>
                Total:{" "}
                <span className="text-gray-800 font-bold text-xl">{formatRupiah(totalHarga)}</span>
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
