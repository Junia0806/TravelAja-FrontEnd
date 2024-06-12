/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import garuda from "../assets/destinasi/garuda.png";

const PaymentCard = () => {
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
      jumlahPenumpang: 3,
    },
  });

  const totalHarga = booking.priceDetails.hargaPerOrang * booking.priceDetails.jumlahPenumpang;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const handlePaymentMethodChange = (e) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      paymentMethod: e.target.value,
    }));
  };

  return (
    <div className="mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mx-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg">Detail Pemesanan</p>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Booking Code</h2>
            <p className="text-xl font-bold text-[#00B7C2]">7239GHK</p>
          </div>

          <div className="flex justify-between items-center space-x-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Keberangkatan</h2>
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
            <i className="fa-solid fa-right-long text-gray-600 text-2xl"></i>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Kedatangan</h2>
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">11:00</span>
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

          <hr className="border-gray-300" />

          <div className="flex items-center space-x-4">
            <img src={garuda} alt="Logo Maskapai" className="w-12 h-12" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Maskapai</h2>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">Garuda Asia</span> - Economy
              </p>
              <p className="text-gray-600">
                Kode Penerbangan:{" "}
                <span className="font-bold text-gray-900">GA-302</span>
              </p>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Informasi</h2>
            <p className="text-gray-600">
              <i className="fa-solid fa-suitcase mr-2"></i>Bagasi:{" "}
              <span className="font-bold text-gray-900">20kg</span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-box mr-2"></i>Kabin:{" "}
              <span className="font-bold text-gray-900">-</span>
            </p>
          </div>
        </div>
      </div>

      {/* Payment Pilihan */}
      <div className="mx-8 bg-white shadow-lg rounded-lg">
        <div className="bg-gray-500 text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg font-bold">Isi Data Pembayaran</p>
        </div>
        <div className="p-8">
          <div className="mb-4">
            <strong className="text-gray-800">Pilih Metode Pembayaran:</strong>
            <div className="ml-4 text-gray-600">
              <select
                className="block w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={booking.paymentMethod}
                onChange={(e) => handlePaymentMethodChange(e)}
              >
                <option value="creditCard">Kartu Kredit</option>
                <option value="bankTransfer">Transfer Bank</option>
                <option value="eWallet">Dompet Digital</option>
              </select>
            </div>
            <hr className="border-t border-gray-200 mt-3" />
          </div>
          <div className="mb-4">
              <strong className="text-gray-800">Rincian Harga:</strong>
              <div className="ml-4 text-gray-600">
                <div className="mb-2">
                  <i className="fa-solid fa-user mr-2"></i>
                  Jumlah Penumpang:{" "}
                  <span className="text-gray-800 font-semibold">{booking.priceDetails.jumlahPenumpang} Orang</span>
                </div>
                <div className="mb-2">
                <i className="fa-solid fa-ticket mr-2"></i>
                  Harga per Orang:{" "}
                  <span className="text-gray-800 font-semibold">{formatRupiah(booking.priceDetails.hargaPerOrang)}</span>
                </div>
                <div className="border-t border-gray-300 mt-2 pt-2">
                  <i className="fa-solid fa-dollar-sign mr-2"></i>
                  Total:{" "}
                  <span className="text-gray-800 font-bold text-xl">{formatRupiah(totalHarga)}</span>
                </div>
              </div>
            </div>
          <div className="flex flex-col space-y-3">
            <Link
              to="/sukses"
              className="block text-center bg-[#00B7C2] hover:bg-[#00b8c2e5] text-white font-bold text-lg py-2 px-4 rounded-md focus:outline-none"
            >
              Bayar Sekarang
            </Link>
            <Link
              to="/sukses"
              className="block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg py-2 px-4 rounded-md focus:outline-none"
            >
              Bayar Nanti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
