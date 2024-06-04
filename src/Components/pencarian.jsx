/* eslint-disable no-unused-vars */
// Color palette 00B7C2
import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Dropdown, Button } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";

export function Pencarian() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasilDitemukan, setHasilDitemukan] = useState(true);
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
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold mb-4">Pilih Penerbangan</h1>
      <div className="flex flex-col md:flex-row items-center w-full mb-4">
        <div className="flex flex-col md:flex-row items-center w-full mb-4 text-white font-semibold">
          <h1 className="rounded-md md:mr-4 mb-4 md:mb-0 bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" />
            Jakarta (CGK) ke Denpasar (DPS) - 2 Penumpang - Ekonomi
          </h1>
          <button type="submit" className=" text-center rounded-md bg-[#195d61] p-2 w-1/5 ml-auto mr-2">
            Ubah Pencarian
          </button>
          <div className="rounded-md bg-[#195d61] p-2 w-aut0">
            <Dropdown label="Pilih" className="bg-[#00B7C2] text-black rounded-lg p-2" dismissOnClick={false}>
              <Dropdown.Item className=" text-white hover:underline hover:text-black border-b border-gray-300">
                <p className="font-bold">Harga</p> - <p className="font-semibold">Terjangkau</p>
              </Dropdown.Item>
              <Dropdown.Item className=" text-white hover:underline hover:text-black border-b border-gray-300">
                <p className="font-bold">Keberangkatan</p> - <p className="font-semibold">Paling Awal</p>
              </Dropdown.Item>
              <Dropdown.Item className=" text-white hover:underline hover:text-black border-b border-gray-300">
                <p className="font-bold">Kedatangan</p> - <p className="font-semibold">Paling Awal</p>
              </Dropdown.Item>
              <Dropdown.Item className=" text-white hover:underline hover:text-black border-b border-gray-300">
                <p className="font-bold">Keberangkatan</p> - <p className="font-semibold">Paling Akhir</p>
              </Dropdown.Item>
              <Dropdown.Item className=" text-white hover:underline hover:text-black border-b border-gray-300">
                <p className="font-bold">Kedatangan</p> - <p className="font-semibold">Paling Akhir</p>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Tabs aria-label="Pills" className="Pills">
          <TabList className="flex justify-around border-b rounded-sm border-gray-300 dark:border-gray-700 bg-[#00B7C2] text-white">
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
                  <span className="text-xs text-gray-700 dark:text-black">{dateString}</span>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel>
            <div className={`p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md ${activeTab === 0 ? "block" : "hidden"}`}>
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md  px-4 py-2 text-white text-left font-bold w-full my-3">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" className="h-8 mr-2" alt="citilink Logo" />
                  Citilink
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Ekonomi</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Departure: 20:00</h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">Arrival: 22:55</h1>
                  </div>
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">Duration: 1h 55mnt</h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 792.656/org</h1>
                </div>
                <div className="p-4 flex justify-end">
                  <Button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60]" onClick={"/detailtiket"}>
                    Lihat
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
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
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">Duration: 1h 55m</h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 909.900/org</h1>
                </div>
                <div className="p-4 flex justify-end">
                  <Button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60]" onClick={"/detailtiket"}>
                    Lihat
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
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
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">Duration: 1h 55m</h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">RP 972.600/org</h1>
                </div>
                <div className="p-4 flex justify-end">
                  <Button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60]">
                    Lihat
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
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
