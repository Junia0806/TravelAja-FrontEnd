import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiAirplaneTakeoffFill, PiAirplaneLandingFill, PiWifiXBold } from "react-icons/pi";
import { LuBaggageClaim } from "react-icons/lu";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { RiDrinksFill } from "react-icons/ri";
import { BiSolidBlanket } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function DetailTiket() {
  const navigate = useNavigate();

  const detailtiket = {
    namaMaskapai: "Citilink",
    kelas: "Ekonomi",
    tanggal: "10 Mei 2024",
    waktuKeberangkatan: "07.00",
    waktuKedatangan: "08.55",
    kotaAsal: "Jakarta(CGK)",
    kotaTujuan: "Denpasar(DPS)",
    bandaraAsal: "Soekarno-Hatta International Airport (CGK)",
    bandaraTujuan: "Ngurah Rai International Airport (DPS)",
    durasi: "1jam 55menit",
    harga: "Rp 792.656",
    cabin: "max 7kg",
    informasi: {
      fasilitas: "air mineral",
    },
  };

  return (
    <div className=" w-full">
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Detail Penerbangan</h1>
      <div className="flex flex-col md:flex-row justify-between w-full p-2 space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" />
            {detailtiket.kotaAsal} ke {detailtiket.kotaTujuan}
          </h1>
          <button type="submit" className="text-center rounded-md bg-gray-800 p-2 w-full md:w-auto" onClick={() => navigate("/pencarian")}>
            Ubah Pencarian
          </button>
        </div>
      </div>
      <div className="flight-ticket-card shadow-lg border-[#00B7C2] border rounded-md px-6 py-4 text-sm text-black dark:text-white font-bold w-full my-4 mx-auto border-opacity-50 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <h2 className="flex items-center text-base font-bold tracking-tight">
            <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" className="h-8 w-8 mr-2 rounded-full" alt="Citilink Logo" /> {detailtiket.namaMaskapai}
          </h2>
          <div className="flex items-center">
            <h1 className="text-blue-700 dark:text-gray-400 font-bold mr-1">{detailtiket.harga}</h1>
            <p className="text-gray-500 font-semibold">/orang</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-3">
          <div>
            <div className="font-bold text-gray-700 dark:text-gray-400">Detail Penerbangan</div>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
              <MdAirlineSeatReclineNormal className="mr-2" /> {detailtiket.kelas}
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
              <GoClockFill className="mr-2" /> {detailtiket.tanggal} | {detailtiket.waktuKeberangkatan} - {detailtiket.waktuKedatangan}
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
              <PiAirplaneTakeoffFill className="mr-2" /> {detailtiket.bandaraAsal}
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
              <PiAirplaneLandingFill className="mr-2" /> {detailtiket.bandaraTujuan}
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
              <LuBaggageClaim className="mr-2" />
              Cabin Baggage: {detailtiket.cabin}
            </h1>
          </div>
        </div>
        <div className="border-b border-gray-300 my-3"></div>
        <div className="font-bold text-gray-700 dark:text-gray-400">Fasilitas</div>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
          <PiWifiXBold className="mr-2" /> tanpa WiFi
        </h1>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
          <RiDrinksFill className="mr-2" /> Air Mineral
        </h1>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold mb-2 p-1 flex items-center">
          <BiSolidBlanket className="mr-2" /> Selimut
        </h1>
        <div className="p-2 flex justify-end">
          <button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60] px-4 py-2 rounded-md" onClick={() => navigate("")}>
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
