/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { FaRegListAlt, FaSearch } from "react-icons/fa";
import { Button } from "flowbite-react";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

export function RiwayatPemesanan() {
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [search, setSearch] = useState("");

  const toggleShow = (type) => {
    if (type === "pemesanan") {
      setShowUnpaid(true);
      setShowPaid(false);
    } else if (type === "bukti") {
      setShowUnpaid(false);
      setShowPaid(true);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDetailClick = () => {
    console.log("Detail Tiket");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pemesanan</h1>
      <div className="flex flex-col md:flex-row items-center w-full mb-4">
        <div className="flex flex-col md:flex-row items-center w-full mb-4 text-white font-semibold ">
          <div className="rounded-sm md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
            <button className={`flex items-center text-white rounded-md px-10 hover:bg-gray-700 mr-4 ${showUnpaid ? "bg-gray-700" : "bg-[#00B7C2]"}`} onClick={() => toggleShow("pemesanan")}>
              <FaRegListAlt className="mr-4" /> Histori Pemesanan
            </button>
            <button className={`flex items-center text-white rounded-md px-10 hover:bg-gray-700 mr-4 ${showPaid ? "bg-gray-700" : "bg-[#00B7C2]"}`} onClick={() => toggleShow("bukti")}>
              <LuListTodo className="mr-4" /> Bukti Transaksi
            </button>
            <div className="relative">
              <input
                type="text"
                className="border-[1px] outline-none max-w-[550px] w-full focus:border-[1px] focus:border-black border-gray-300 ps-1 rounded-md px-2 py-1"
                placeholder="Search projects"
                value={search}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mb-4">
        <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-6 py-4 text-black text-left font-bold w-full my-3 bg-white">
          <div className="flex items-center justify-between mb-4">
            <Button className="text-white font-semibold rounded-full bg-red-400 hover:bg-red-500" onClick={handleDetailClick}>
              Lanjutkan Pembayaran
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Jakarta
              </h1>
              <h1 className="text-gray-700 font-semibold">3 Juni 2024</h1>
              <h1 className="text-gray-700 font-semibold">07:00</h1>
            </div>
            <div className="flex items-center">
              <FaArrowRight className="mx-4 text-gray-700" />
              <h1 className="text-gray-700 font-semibold border-b border-gray-700 mx-4"> 1j 30mnt</h1>
              <FaArrowRight className="mx-4 text-gray-700" />
            </div>{" "}
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Surabaya
              </h1>
              <h1 className="text-gray-700 font-semibold">3 Juni 2024</h1>
              <h1 className="text-gray-700 font-semibold">08:30</h1>
            </div>
          </div>
          <div className="border-b-2 border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-black font-bold">Kode Tiket:</h1>
              <h1 className="text-gray-700 font-semibold">JS123</h1>
            </div>
            <div>
              <h1 className="text-black font-bold">Kelas:</h1>
              <h1 className="text-gray-700 font-semibold">Bisnis</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-blue-700 font-bold mr-2">RP 2.550.000</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mb-4">
        <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-6 py-4 text-black text-left font-bold w-full my-3 bg-white">
          <div className="flex items-center justify-between mb-4">
            <Button className="text-white font-semibold rounded-full bg-green-400 hover:bg-green-600" onClick={handleDetailClick}>
              Pembayaran Berhasil
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Surabaya
              </h1>
              <h1 className="text-gray-700 font-semibold">31 Mei 2024</h1>
              <h1 className="text-gray-700 font-semibold">16:00</h1>
            </div>
            <div className="flex items-center">
              <FaArrowRight className="mx-4 text-gray-700" />
              <h1 className="text-gray-700 font-semibold border-b border-gray-700 mx-4"> 4j 20mnt</h1>
              <FaArrowRight className="mx-4 text-gray-700" />
            </div>
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Medan
              </h1>
              <h1 className="text-gray-700 font-semibold">31 Mei 2024</h1>
              <h1 className="text-gray-700 font-semibold">19:20</h1>
            </div>
          </div>
          <div className="border-b-2 border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-black font-bold">Kode Tiket:</h1>
              <h1 className="text-gray-700 font-semibold">SM123</h1>
            </div>
            <div>
              <h1 className="text-black font-bold">Kelas:</h1>
              <h1 className="text-gray-700 font-semibold">Ekonomi</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-blue-700 font-bold mr-2">RP 780.000</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mb-4">
        <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-6 py-4 text-black text-left font-bold w-full my-3 bg-white">
          <div className="flex items-center justify-between mb-4">
            <Button className="text-white font-semibold rounded-full bg-green-400 hover:bg-green-500" onClick={handleDetailClick}>
              Pembayaran Berhasil
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Jakarta
              </h1>
              <h1 className="text-gray-700 font-semibold">20 Mei 2024</h1>
              <h1 className="text-gray-700 font-semibold">20:00</h1>
            </div>
            <div className="flex items-center">
              <FaArrowRight className="mx-4 text-gray-700" />
              <h1 className="text-gray-700 font-semibold border-b border-gray-700 mx-4"> 1h 55mnt</h1>
              <FaArrowRight className="mx-4 text-gray-700" />
            </div>
            <div>
              <h1 className="flex items-center text-gray-700 font-semibold mb-2">
                <FaLocationDot className="mr-2" /> Bali
              </h1>
              <h1 className="text-gray-700 font-semibold">20 Mei 2024</h1>
              <h1 className="text-gray-700 font-semibold">22:55</h1>
            </div>
          </div>
          <div className="border-b-2 border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-black font-bold">Kode Tiket:</h1>
              <h1 className="text-gray-700 font-semibold">JB123</h1>
            </div>
            <div>
              <h1 className="text-black font-bold">Kelas:</h1>
              <h1 className="text-gray-700 font-semibold">Bisnis</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-blue-700 font-bold mr-2">RP 5.500.000</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
