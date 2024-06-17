/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaPlaneDeparture } from "react-icons/fa";
import axios from "axios";
import foto from "../assets/destinasi/destinasi.jpg";

export function Pencarian() {
  const [flight, setFlight] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location.state);
  const valuePencarian = location.state.formData;
  const [activeTab, setActiveTab] = useState(0);
  // const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const today = new Date();

  // useEffect untuk search
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://expressjs-develop.up.railway.app/api/v1/search?arrival_airport_id=${valuePencarian.arrivalAirport.id}&destination_airport_id=${valuePencarian.departureAirport.id}&seat_class_type=${valuePencarian.seatClass}&date=${valuePencarian.departureDate}`
        );
        console.log("response", response);
        setFlight(response.data.data);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, [valuePencarian]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  //untuk animasi pesawat
  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  //untuk mencari durasi penerbangan
  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const calculateFlightDuration = (departure, arrival) => {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
    const durationInMinutes = (arrivalTime - departureTime) / (1000 * 60);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    return `${hours} jam ${minutes} menit`;
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Pilih Penerbangan</h1>
      <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 p-2">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" onClick={() => navigate("/")} />
            {valuePencarian.departureAirport?.city} ({valuePencarian.departureAirport.id}) ke {valuePencarian.arrivalAirport.city} ({valuePencarian.arrivalAirport.id}) - {valuePencarian.seatClass}
          </h1>
          <select className="select-cst text-center rounded-md bg-gray-800 p-2 w-full md:w-auto">
            <option value="" disabled selected hidden>
              Urutkan Berdasarkan
            </option>
            <option value="price">Harga - Terjangkau</option>
            <option value="departure_early">Keberangkatan - Paling Awal</option>
            <option value="departure_late">Keberangkatan - Paling Akhir</option>
            <option value="arrival_early">Kedatangan - Paling Awal</option>
            <option value="arrival_late">Kedatangan - Paling Akhir</option>
          </select>
        </div>
      </div>

      {/* untuk mencari tanggal secara realtime */}
      <div className="overflow-x-auto w-full mt-4">
        <Tabs className="Pills">
          <TabList className="flex justify-around border-b rounded-sm border-gray-300 dark:border-gray-700 bg-white text-[#00B7C2]">
            {[...Array(7)].map((_, index) => {
              const date = new Date(today);
              date.setDate(today.getDate() + index);
              const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
              return (
                <Tab
                  key={index}
                  className={`flex flex-col items-center p-2 text-center cursor-pointer font-semibold dark:border-[#00B7C2] ${activeTab === index ? "bg-gray-200 dark:bg-gray-800 text-black" : "hover:bg-gray-200 hover:text-black"}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="text-xs text-gray-700 dark:text-black">{dateString}</span>
                </Tab>
              );
            })}
          </TabList>

          {/* untuk menampilkan hasil pencarian */}
          <TabPanel>
            {flight.length > 0 ? (
              flight.map((flight, index) => (
                <div key={index} className="p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md max-w-7xl items-center justify-between mx-auto">
                  <div className="mx-8 bg-white shadow-lg rounded-lg outline-1 mb-4">
                    <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
                      <p className="flex items-center text-lg font-bold tracking-tight">
                        <img src={flight?.airlines?.url_logo || foto} className="h-8 w-8 mr-2 rounded-full" alt={flight?.airlines?.name || "Citilink Logo"} /> {flight.airlines.airline_name} - {valuePencarian.seatClass}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-700 dark:text-gray-400 font-semibold">{formatTime(flight?.departure_time)}</span>
                        <span className="text-gray-700 dark:text-gray-400 font-semibold">
                          {flight.destination_airport?.city} <span>({flight.destination_airport_id})</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-center col-span-2">
                        <animated.div style={planeAnimation} className="flex flex-col items-center">
                          <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                          <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center"> {calculateFlightDuration(flight.departure_time, flight.arrival_time)}</span>
                        </animated.div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-700 dark:text-gray-400 font-semibold">{formatTime(flight.arrival_time)}</span>
                        <span className="text-gray-700 dark:text-gray-400 font-semibold">
                          {flight.arrival_airport?.city} <span>({flight.arrival_airport_id})</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4">
                      <span className="text-[#00B7C2] text-lg font-bold mt-2 sm:mt-0"> Rp. {flight.total_price.toLocaleString("id-ID")}</span>
                      <Link to={`/detail/${flight.flight_id}`} className="block text-center bg-gray-600 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700 dark:text-gray-400 mt-4">Tidak ada penerbangan yang ditemukan.</div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
