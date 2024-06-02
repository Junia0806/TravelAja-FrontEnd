/* eslint-disable no-unused-vars */
// Color palette 00B7C2
import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TfiMoney } from "react-icons/tfi";
import { PiHeartFill } from "react-icons/pi";

export function Pencarian() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasilDitemukan, setHasilDitemukan] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const today = new Date();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // const handlePilihClick = () => {
  //   // Tampilkan spinner ketika tombol Pilih diklik
  //   setIsLoading(true);

  //   // Lakukan tindakan yang sesuai di sini, misalnya mengirim permintaan ke server

  //   // Setelah tindakan selesai, sembunyikan spinner
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setHasilDitemukan(false);
  //   }, 2000); // Ganti nilai 2000 dengan waktu yang sesuai dengan kebutuhan Anda
  // };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Pilih Penerbangan</h1>
      <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 p-2 ">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" />
            Jakarta (CGK) ke Denpasar (DPS) - 2 Penumpang - Ekonomi
          </h1>
          {/* <button type="submit" className="text-center rounded-md bg-[#195d61] p-2 w-full md:w-auto">
            Ubah Pencarian
          </button> */}
          <select className="select-cst text-center rounded-md bg-gray-800 p-2 w-full md:w-auto">
            <option value="" disabled selected hidden>
              Urutkan Berdasarkan
            </option>
            <option value="">Harga - Terjangkau</option>
            <option value="">Keberangkatan - Paling Awal</option>
            <option value="">Keberangkatan - Paling Akhir</option>
            <option value="">Kedatangan - Paling Awal</option>
            <option value="">Kedatangan - Paling Akhir</option>
          </select>
        </div>
      </div>

      <div className="mt-1 p-4">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold">Filter :</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-10">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none flex items-center justify-center">
            <PiHeartFill className="mr-2" />
            Fasilitas
          </button>
          <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center">
            <TfiMoney className="mr-2" />
            Harga
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full mt-4">
        <Tabs className="Pills">
          <TabList className="flex justify-around border-b rounded-sm border-gray-300 dark:border-gray-700 bg-white text-[#00B7C2]">
            {days.map((day, index) => {
              const date = new Date(today);
              date.setDate(today.getDate() + index);
              const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
              return (
                <Tab
                  key={index}
                  className={`flex flex-col items-center p-2 text-center cursor-pointer font-semibold dark:border-[#00B7C2] ${activeTab === index ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 hover:text-black"}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="text-sm">{day}</span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{dateString}</span>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel>
            <div className={`p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md max-w-7xl items-center justify-between ${activeTab === 0 ? "block" : "hidden"} mx-auto`}>
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-4 py-2 text-white text-left font-bold w-full my-3">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" className="h-8 mr-2" alt="citilink Logo" />
                  Citilink
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Ekonomi</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Departure: 20:00</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Arrival: 22:55</h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">1j 55mnt</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 792.656/org</h1>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60] px-4 py-2 rounded-md" onClick={() => navigate("/detailtiket")}>
                    Lihat
                  </button>
                </div>
              </div>

              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-4 py-2 text-white text-left font-bold w-full">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/11/26/451507063.jpg" className="h-8 mr-2" alt="Airline Logo" />
                  Super Air Jet
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Ekonomi</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Departure: 18:45 </h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Arrival: 21:40</h1>
                  </div>
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">1j 55mnt</h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 909.900/org</h1>
                </div>
                <div className="p-4 flex justify-end">
                  <button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60] px-4 py-2 rounded-md" onClick={() => navigate("/detailtiket")}>
                    Lihat
                  </button>
                </div>
              </div>
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md  px-4 py-2 text-white text-left font-bold w-full my-3">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg" className="h-8 mr-2" alt="Airasia Logo" />
                  AirAsia Indonesia
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Ekonomi</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Departure: 20:00</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Arrival: 22:55</h1>
                  </div>
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">1j 55mnt</h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 972.600/org</h1>
                </div>
                <div className="p-4 flex justify-end">
                  <button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60] px-4 py-2 rounded-md" onClick={() => navigate("/detailtiket")}>
                    Lihat
                  </button>
                </div>
              </div>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 1 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Selasa </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 2 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Rabu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 3 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Kamis</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 4</p>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 4 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Jumat</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 5</p>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 5 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Sabtu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 6</p>
            </div>
            <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${activeTab === 6 ? "block" : "hidden"}`}>
              <h2 className="text-lg font-semibold mb-2">Minggu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Content 7</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
