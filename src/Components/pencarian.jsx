import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaPlaneDeparture } from "react-icons/fa";
import axios from "axios";
import noData from "../assets/noData.png";

export function Pencarian() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [flightsByDate, setFlightsByDate] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const valuePencarian = location.state?.formData;

  const getDateRange = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      dates.push(dateString);
    }
    return dates;
  };

  const getDayName = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  };

  // const dates = valuePencarian?.departureDate ? getDateRange(valuePencarian?.departureDate) : [];
  const dates = useMemo(() => {
    return valuePencarian?.departureDate ? getDateRange(valuePencarian.departureDate) : null;
  }, [valuePencarian?.departureDate]);

  useEffect(() => {
    async function fetchData() {
      if (!dates) return;

      try {
        const responses = await Promise.all(
          dates.map((dateString) => {
            const [day, month, year] = dateString.split("/");
            const formattedDate = `${year}-${month}-${day}`;
            return axios.get(
              `https://expressjs-production-7d85.up.railway.app/api/v1/flights/search?arrival_airport_id=${valuePencarian.arrivalAirport.id}&destination_airport_id=${valuePencarian.departureAirport.id}&seat_class_type=${valuePencarian.seatClass}&date=${formattedDate}`
            );
          })
        );

        const flightData = responses.flatMap((response) => response.data.data);
        console.log("respons>>", flightData);
        setFlights(flightData);

        const groupedFlights = flightData.reduce((acc, flight) => {
          const date = new Date(flight.departure_time).toLocaleDateString("id-ID");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(flight);
          return acc;
        }, {});

        setFlightsByDate(groupedFlights);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    }

    fetchData();
  }, [valuePencarian, dates]);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const currentTabDate = dates[activeTab];
      const [day, month, year] = currentTabDate.split("/");
      const formattedDate = `${day}/${month}/${year}`;
      setFilteredFlights(flightsByDate[formattedDate]);
    }
  }, [activeTab, flightsByDate, dates]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

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

    if (minutes === 0) {
      return `${hours} jam`;
    } else {
      return `${hours} jam ${minutes} menit`;
    }
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue);
  };

  const sortFlights = (flight, order) => {
    return flight.sort((a, b) => {
      if (order === "ascending") {
        return a.total_price - b.total_price;
      } else if (order === "descending") {
        return b.total_price - a.total_price;
      } else {
        return 0;
      }
    });
  };

  const sortedFlightsByDate = {};
  Object.keys(flightsByDate).forEach((date) => {
    sortedFlightsByDate[date] = sortFlights([...flightsByDate[date]], sortOrder);
  });

  const scrollContainerStyle = {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "4px",
  };

  const scrollItemStyle = {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "0 5px",
    borderRadius: "8px",
    flex: "1 1 auto",
    minWidth: "180px",
    maxWidth: "210px",
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 p-2">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" onClick={() => navigate("/")} />
            {valuePencarian?.departureAirport?.city} ({valuePencarian?.departureAirport?.id}) ke {valuePencarian?.arrivalAirport?.city} ({valuePencarian?.arrivalAirport?.id}) - {valuePencarian?.seatClass}
          </h1>
          <select className="select-cst text-center rounded-md bg-gray-800 p-2 w-full md:w-auto" onChange={handleFilterChange}>
            <option value="0"> Pilihan Harga </option>
            <option value="ascending">Harga Ekonomis</option>
            <option value="descending">Harga Eksklusif</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-4">
        <Tabs className="Pills">
          <TabList className="flex flex-row justify-start border-b rounded-sm border-gray-300 dark:border-gray-700 bg-white text-[#00B7C2]" style={scrollContainerStyle}>
            {dates &&
              dates.map((dateString, index) => (
                <Tab
                  key={index}
                  className={`p-2 text-center cursor-pointer font-semibold dark:border-[#00B7C2] ${activeTab === index ? "bg-gray-200 dark:bg-gray-800 text-black" : "hover:bg-gray-200 hover:text-black"} md:p-4 md:text-sm`}
                  style={scrollItemStyle}
                  onClick={() => handleTabClick(index)}
                >
                  <span>{getDayName(dateString)}</span>
                  <span className="p-1 text-xs text-gray-700 dark:text-black">{dateString}</span>
                </Tab>
              ))}
          </TabList>

          {dates.map((dateString, index) => (
            <TabPanel key={index}>
              {sortedFlightsByDate[dateString]?.length > 0 ? (
                sortedFlightsByDate[dateString].map((flight, index) => (
                  <div key={index} className="p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md max-w-7xl items-center justify-between mx-auto">
                    <div className="mx-8 bg-white shadow-lg rounded-lg outline-1 mb-4">
                      <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
                        <p className="flex items-center text-lg font-bold tracking-tight">
                          <img src={flight?.airlines?.url_logo} className="h-8 w-8 mr-2 rounded-full" alt={flight?.airlines?.name || "Citilink Logo"} /> {flight.airlines.airline_name} - {valuePencarian.seatClass}
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
                            {flight.arrival_airport?.city} <span>({flight?.arrival_airport_id})</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4">
                        <span className="text-[#00B7C2] text-lg font-bold mt-2 sm:mt-0"> Rp {flight.price.toLocaleString("id-ID")}</span>
                        <Link to={`/detail/${flight?.flight_id}`} className="block text-center bg-gray-600 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-700 dark:text-gray-400 mt-4">
                  <img src={noData} alt="No Data" className="mx-auto my-4 w-64 h-64" />
                  Tidak ada penerbangan yang ditemukan.
                </div>
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
