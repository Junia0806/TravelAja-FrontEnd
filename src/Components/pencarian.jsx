/* eslint-disable no-unused-vars */
// Color palette 00B7C2
import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Dropdown, Button } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  FaPlaneDeparture,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";

export function Pencarian() {
  const [activeTab, setActiveTab] = useState(0);
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const today = new Date();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center w-full">
    <div className="flex flex-col md:flex-row items-center w-full mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row items-center w-full text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 flex items-center text-left w-full md:w-auto md:flex-grow">
            <IoMdArrowRoundBack className="mr-2" />
            Jakarta (CGK) ke Denpasar (DPS) - Ekonomi
          </h1>
          <button
            type="submit"
            className="text-center rounded-md bg-gray-400 text-white p-2 w-full md:w-auto mt-4 md:mt-0 md:ml-4"
          >
            Ubah Pencarian
          </button>
          <div className="rounded-md p-2 w-full md:w-auto mt-4 md:mt-0 md:ml-4">
            <Dropdown
              label="Pilih"
              className="bg-white text-black rounded-lg p-2 w-32 md:w-auto"
              dismissOnClick={false}
            >
              <Dropdown.Item className="text-black hover:underline hover:text-[#00B7C2] border-b border-gray-300">
                <p className="font-bold">Harga</p> -{" "}
                <p className="font-semibold">Terjangkau</p>
              </Dropdown.Item>
              <Dropdown.Item className="text-black hover:underline hover:text-[#00B7C2] border-b border-gray-300">
                <p className="font-bold">Keberangkatan</p> -{" "}
                <p className="font-semibold">Paling Awal</p>
              </Dropdown.Item>
              <Dropdown.Item className="text-black hover:underline hover:text-[#00B7C2] border-b border-gray-300">
                <p className="font-bold">Kedatangan</p> -{" "}
                <p className="font-semibold">Paling Awal</p>
              </Dropdown.Item>
              <Dropdown.Item className="text-black hover:underline hover:text-[#00B7C2] border-b border-gray-300">
                <p className="font-bold">Keberangkatan</p> -{" "}
                <p className="font-semibold">Paling Akhir</p>
              </Dropdown.Item>
              <Dropdown.Item className="text-black hover:underline hover:text-[#00B7C2] border-b border-gray-300">
                <p className="font-bold">Kedatangan</p> -{" "}
                <p className="font-semibold">Paling Akhir</p>
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
              const dateString = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              return (
                <Tab
                  key={index}
                  className={`flex flex-col items-center p-2 text-center cursor-pointer font-semibold dark:border-[#00B7C2] ${
                    activeTab === index
                      ? "bg-gray-200 dark:bg-gray-800 text-black"
                      : "hover:bg-gray-200 hover:text-black"
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="text-sm">{day}</span>
                  <span className="text-xs text-gray-700 dark:text-black">
                    {dateString}
                  </span>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel>
            <div
              className={`p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md ${
                activeTab === 0 ? "block" : "hidden"
              }`}
            >
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-4 py-2 text-black dark:text-white font-bold w-full my-3">
                <h2 className="flex items-center text-lg font-bold tracking-tight">
                  <img
                    src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp"
                    className="h-8 mr-2"
                    alt="citilink Logo"
                  />
                  Citilink - Ekonomi
                </h2>
                <div className="grid grid-cols-3 gap-4 items-center my-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">
                      07.00
                    </span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">
                      CGK
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <animated.div
                      style={planeAnimation}
                      className="flex flex-col items-center"
                    >
                      <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                      <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">
                        1jam 55menit
                      </span>
                    </animated.div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">
                      08.55
                    </span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">
                      DPS
                    </span>
                  </div>
                </div>
                <div className="flex justify-end items-center my-4">
                  <p className="text-[#00B7C2] text-xl font-bold flex items-center mr-4">
                    Rp. 792.656
                  </p>
                  <Link
                    to="/detail"
                    className="block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold text-l py-2 px-4 rounded-md  focus:outline-none"
                  >
                    Lihat <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md px-4 py-2 text-white text-left font-bold w-full">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img
                    src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/11/26/451507063.jpg"
                    className="h-8 mr-2"
                    alt="Airline Logo"
                  />
                  Super Air Jet
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Ekonomi
                    </h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Departure: 18:45{" "}
                    </h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Arrival: 21:40
                    </h1>
                  </div>
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">
                    Duration: 1h 55m
                  </h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">
                    RP 909.900/org
                  </h1>
                </div>
                <div className="p-4 flex justify-end">
                  <Button
                    className="text-white bg-[#00B7C2] hover:bg-[#0f5c60]"
                    onClick={"/detailtiket"}
                  >
                    Lihat
                    <svg
                      className="-mr-1 ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="flight-ticket-card shadow-lg border-[#00B7C2] border-2 rounded-md  px-4 py-2 text-white text-left font-bold w-full my-3">
                <h2 className="flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f5/AirAsia_New_Logo.svg"
                    className="h-8 mr-2"
                    alt="Airasia Logo"
                  />
                  AirAsia Indonesia
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Ekonomi
                    </h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Departure: 20:00
                    </h1>
                    <h1 className="text-gray-700 dark:text-gray-400 font-semibold">
                      Arrival: 22:55
                    </h1>
                  </div>
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold border-b border-gray-700">
                    Duration: 1h 55m
                  </h1>
                  <h1 className="text-gray-700 dark:text-gray-400 font-bold">
                    RP 972.600/org
                  </h1>
                </div>
                <div className="p-4 flex justify-end">
                  <Button className="text-white bg-[#00B7C2] hover:bg-[#0f5c60]">
                    Lihat
                    <svg
                      className="-mr-1 ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 1 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Selasa </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 2
              </p>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 2 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Rabu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 3
              </p>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 3 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Kamis</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 4
              </p>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 4 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Jumat</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 5
              </p>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 5 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Sabtu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 6
              </p>
            </div>
            <div
              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-md ${
                activeTab === 6 ? "block" : "hidden"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Minggu</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Content 7
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
