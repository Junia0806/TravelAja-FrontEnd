/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { FaRegListAlt, FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export function RiwayatPemesanan() {
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const pemesanan = {
    namaMaskapai: "Citilink",
    kelas: "Ekonomi",
    tanggal: "10 Mei 2024",
    waktuKeberangkatan: "07.00",
    waktuKedatangan: "08.55",
    bandaraAsal: "Jakarta(CGK)",
    bandaraTujuan: "Denpasar(DPS)",
    durasi: "1jam 55menit",
    harga: "Rp 3.170.624",
    kodeBoking: "JS123",
    jumlahPenumpang: "4",
  };

  const toggleShow = (type) => {
    if (type === "pemesanan") {
      setShowUnpaid(true);
      setShowPaid(false);
      setShowFilters(false); // Hide filters when "Histori Pemesanan" is clicked
    } else if (type === "bukti") {
      setShowUnpaid(false);
      setShowPaid(true);
      setShowFilters(!showFilters); // Toggle filter visibility when "Bukti Transaksi" is clicked
    } else {
      alert("Please select a date first.");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDetailClick = () => {
    console.log("/detailriwayat");
  };

  return (
    <div className=" w-full">
      <h1 className="text-2xl font-bold mb-6 mt-3 border-b text-center">Riwayat Pemesanan</h1>
      <div class="flex flex-col md:flex-row justify-between w-full p-2 space-y-2 md:space-y-0">
        <div class="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <button className={`flex items-center text-white rounded-md px-12 py-2 hover:bg-gray-700 mr-2 md:px-4 ${showUnpaid ? "bg-gray-700" : "bg-[#00B7C2]"}`} onClick={() => toggleShow("pemesanan")}>
            <LuListTodo className="mr-4" /> Histori Transaksi
          </button>
          <button className={`flex items-center text-white rounded-md px-12 py-2 hover:bg-gray-700 mr-2 md:px-4 ${showPaid ? "bg-gray-700" : "bg-[#00B7C2]"}`} onClick={() => toggleShow("bukti")}>
            <FaRegListAlt className="mr-4" /> Bukti Transaksi
          </button>
          {showFilters && (
            <select class="select-cst text-center rounded-md bg-[#00B7C2] hover:bg-gray-700 p-2 md:px-4 w-full md:w-auto mr-2 md:mr-0">
              <option value="asc">Transaksi Baru</option>
              <option value="desc">Transaksi Lama</option>
            </select>
          )}
          <div class="relative flex-grow">
            <input type="text" class="border-[1px] outline-none w-full focus:border-[1px] focus:border-black border-gray-300 px-4 py-2 rounded-md" placeholder="Cari" value={search} onChange={handleSearch} />
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      <div className="flight-ticket-card shadow-lg  border rounded-md px-6 py-4 text-sm text-black dark:text-white font-bold w-full my-4 mx-auto border-opacity-50 max-w-4xl">
        <div class="flex items-center justify-between">
          <p class="flex items-center text-lg font-bold tracking-tight">
            <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" class="h-8 w-8 mr-2 rounded-full" alt="Citilink Logo" />
            {pemesanan.namaMaskapai}
          </p>
          <div class="flex items-center justify-between">
            <h1 class="text-gray-700 dark:text-gray-400 font-semibold mr-2">Total Harga:</h1>
            <p class="text-[#00B7C2] font-bold">{pemesanan.harga}</p>
          </div>
        </div>
        <div class="border-b-2 border-[#00B7C2] my-2"></div>
        <div className="flex flex-col md:flex-row justify-between my-3">
          <div class="flex flex-col items-start">
            <div class="flex items-center justify-between mb-2">
              <h1 class="text-black font-bold mr-2">Kode Pemesanan:</h1>
              <p class="text-gray-600 font-semibold">{pemesanan.kodeBoking}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaLocationDot class="mr-2" />
                  {pemesanan.bandaraAsal}
                </span>
                <FaArrowRight class="mx-2 text-gray-700" />
              </div>
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaLocationDot class="mr-2" />
                  {pemesanan.bandaraTujuan}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaRegCalendarAlt class="mr-2" />
                  {pemesanan.tanggal}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FiClock class="mr-2" /> {pemesanan.waktuKeberangkatan} - {pemesanan.waktuKedatangan}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span className="flex text-gray-500 font-semibold mb-2">
                  <IoPerson className="mr-2" /> Jumlah Penumpang: <span className="text-black ml-2">{pemesanan.jumlahPenumpang} Orang </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4 ">
          <Link to="/detailriwayat" class="block text-center bg-red-500 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
            Lanjutkan Pembayaran
          </Link>
        </div>
      </div>

      <div className="flight-ticket-card shadow-lg  border rounded-md px-6 py-4 text-sm text-black dark:text-white font-bold w-full my-4 mx-auto border-opacity-50 max-w-4xl">
        <div class="flex items-center justify-between">
          <p class="flex items-center text-lg font-bold tracking-tight">
            <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" class="h-8 w-8 mr-2 rounded-full" alt="Citilink Logo" />
            {pemesanan.namaMaskapai}
          </p>
          <div class="flex items-center justify-between">
            <h1 class="text-gray-700 dark:text-gray-400 font-semibold mr-2">Total Harga:</h1>
            <p class="text-[#00B7C2] font-bold">{pemesanan.harga}</p>
          </div>
        </div>
        <div class="border-b-2 border-[#00B7C2] my-2"></div>
        <div className="flex flex-col md:flex-row justify-between my-3">
          <div class="flex flex-col items-start">
            <div class="flex items-center justify-between mb-2">
              <h1 class="text-black font-bold mr-2">Kode Pemesanan:</h1>
              <p class="text-gray-600 font-semibold">{pemesanan.kodeBoking}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaLocationDot class="mr-2" />
                  {pemesanan.bandaraAsal}
                </span>
                <FaArrowRight class="mx-2 text-gray-700" />
              </div>
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaLocationDot class="mr-2" />
                  {pemesanan.bandaraTujuan}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FaRegCalendarAlt class="mr-2" />
                  {pemesanan.tanggal}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span class="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                  <FiClock class="mr-2" /> {pemesanan.waktuKeberangkatan} - {pemesanan.waktuKedatangan}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-start">
                <span className="flex text-gray-500 font-semibold mb-2">
                  <IoPerson className="mr-2" /> Jumlah Penumpang: <span className="text-black ml-2">{pemesanan.jumlahPenumpang} Orang </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4 ">
          <Link to="/detailriwayat" class="block text-center bg-green-500 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
            Pembayaran Berhasil
          </Link>
        </div>
      </div>
    </div>
  );
}
