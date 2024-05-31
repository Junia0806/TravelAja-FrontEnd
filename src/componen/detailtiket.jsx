// Color palette 00B7C2
import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import "tailwindcss/tailwind.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { LuBaggageClaim } from "react-icons/lu";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { PiWifiXBold } from "react-icons/pi";
import { RiDrinksFill } from "react-icons/ri";
import { BiSolidBlanket } from "react-icons/bi";

export function DetailTiket() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold mb-4">Detail Penerbangan</h1>
      <div className="flex flex-col md:flex-row items-center w-full mb-4">
        <div className="flex flex-col md:flex-row items-center w-full mb-4 text-white font-semibold">
          <h1 className="rounded-md md:mr-4 mb-4 md:mb-0 bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" />
            Jakarta (CGK) ke Denpasar (DPS) - Bali
          </h1>
          <button type="submit" className=" text-center rounded-md bg-[#195d61] p-2 w-1/5 ml-auto mr-2">
            Ubah Pencarian
          </button>
        </div>
      </div>
      <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-4 py-2 text-white text-left font-bold w-full my-3">
        <div class="flex items-center justify-between">
          <h2 class="flex items-center text-xl font-bold tracking-tight text-black dark:text-white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg" class="h-8 mr-4" alt="Airasia Logo" />
            AirAsia Indonesia
          </h2>
          <div class="flex items-center">
            <h1 class="text-blue-700 dark:text-gray-400 font-bold mr-2">RP 972.600</h1>
            <p class="text-gray-500 font-semibold">/orang</p>
          </div>
        </div>
        <div className="flex justify-between items-center my-6 ">
          <div>
            <div className=" font-bold text-gray-700 dark:text-gray-400">Detail Penerbangan</div>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
              <MdAirlineSeatReclineNormal className="mr-4" /> Ekonomi | CT123
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
              <GoClockFill className="mr-4" /> 10 Mei 2024 | 20:00 - 22:55
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
              <PiAirplaneTakeoffFill className="mr-4" /> Soekarno-Hatta International Airport (CGK)
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
              <LuBaggageClaim className="mr-4" />
              Cabin Baggage: Max 7kg
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
              <PiAirplaneLandingFill className="mr-4" /> Ngurah Rai International Airport (DPS)
            </h1>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 my-4"></div>
        <div className=" font-bold text-gray-700 dark:text-gray-400">Fasilitas</div>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
          <PiWifiXBold className="mr-4" /> tanpa WiFi
        </h1>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
          <RiDrinksFill className="mr-4" /> Air Mineral
        </h1>
        <h1 className="text-gray-700 dark:text-gray-400 font-semibold md:mr-4 mb-4 md:mb-0  p-2 w-full flex items-center text-left">
          <BiSolidBlanket className="mr-4" /> Selimut
        </h1>
        <div className="p-4 flex justify-end ">
          <button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60] rounded-md p-2 mr-2">Pilih</button>
          <button className="text-white bg-[#aa9f22] hover:bg-[#22230e] rounded-md p-2">Kembali</button>
        </div>
      </div>
    </div>
  );
}
