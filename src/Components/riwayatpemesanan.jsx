import React, { useEffect, useState } from "react";
import { IoPerson, IoStatsChartSharp } from "react-icons/io5";
import { FaLocationDot, FaPlaneDeparture } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../Redux/actions/bookingActions";
import StatusHistory from "../assets/status pesanan/Status Airlines(4).png";
import { useSpring, animated } from "react-spring";

export default function RiwayatPemesanan() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const bookingHistory = useSelector((state) => state.booking.dataHistory);

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  const filteredBooking = Array.isArray(bookingHistory)
    ? bookingHistory
        .filter((pemesanan) => {
          if (filter === "all") return true;
          if (filter === "paid") return pemesanan?.payment?.status === "PAID";
          if (filter === "pending")
            return pemesanan?.payment?.status === "PENDING_PAYMENT";
          if (filter === "canceled")
            return pemesanan?.payment?.status === "CANCELED";
          return true;
        })
        .filter((pemesanan) => {
          if (!search) return true;
          const searchLower = search.toLowerCase();
          const bookingDateFormatted = formatDate(
            pemesanan.booking_date
          ).toLowerCase();
          return (
            bookingDateFormatted.includes(searchLower) ||
            pemesanan.booking_code.toLowerCase().includes(searchLower) ||
            pemesanan.flight.flight_id.toLowerCase().includes(searchLower) ||
            pemesanan.flight.destination_airport.airport_name
              .toLowerCase()
              .includes(searchLower) ||
            pemesanan.flight.arrival_airport.airport_name
              .toLowerCase()
              .includes(searchLower)
          );
        })
        .sort((a, b) => b.booking_id - a.booking_id)
    : [];

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

  return (
    <div className="mx-4">
      <div className="flex flex-col md:flex-row justify-between w-full p-2 space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-black font-semibold">
          <select
            className="select-cst text-center text-white rounded-md bg-[#00B7C2] hover:bg-gray-700 p-2 md:px-4 w-full md:w-auto mr-2 md:mr-0 flex items-center"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">Semua</option>
            <option value="paid">Lunas</option>
            <option value="pending">Pending</option>
            <option value="canceled">Dibatalkan</option>
          </select>
          <div className="flex-col md:flex-row items-center w-full">
            <input
              type="text"
              className="border-[1px] outline-none w-full focus:border-[1px] focus:border-black border-gray-300 px-4 py-2 rounded-md"
              placeholder="Temukan riwayat pemesananmu disini 🔎"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {filteredBooking.length > 0 ? (
        filteredBooking.map((pemesanan) => {
          const flightDuration = calculateFlightDuration(
            pemesanan.flight.departure_time,
            pemesanan.flight.arrival_time
          );

          return (
            <div
              key={pemesanan.booking_id}
              className="container mx-auto p-4 shadow-lg border rounded-md px-6 py-4 text-sm text-black dark:text-white font-bold w-full my-4 border-opacity-50 "
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <img
                    src={pemesanan.flight.airlines.url_logo}
                    className="h-8 w-8 mr-2 rounded-full"
                    alt="Airlines Logo"
                  />
                  <p className="text-lg font-bold tracking-tight">
                    {pemesanan.flight.flight_id}
                  </p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <h1 className="text-gray-700 dark:text-gray-400 font-semibold mr-2">
                    Total Harga:
                  </h1>
                  <p className="text-[#00B7C2] font-bold">
                    Rp {pemesanan.payment.total_price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="border-b-2 border-[#00B7C2]"></div>
              <div className="my-3">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-black font-bold mr-2">
                      Kode Pemesanan:
                    </h1>
                    <p className="text-gray-600 font-semibold">
                      {pemesanan.booking_code}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-black font-bold mr-2">
                      Tanggal Pemesanan:
                    </h1>
                    <p className="text-gray-600 font-semibold">
                      {formatDate(pemesanan.booking_date)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-2">
                  <div className="flex items-center sm:justify-start">
                    <span className="flex items-center text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />
                      {pemesanan.flight.destination_airport.airport_name}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <animated.div
                      style={planeAnimation}
                      className="flex flex-col items-center"
                    >
                      <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                      <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">
                        {flightDuration}
                      </span>
                    </animated.div>
                  </div>
                  <div className="flex items-center sm:justify-end">
                    <span className="flex items-center text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />
                      {pemesanan.flight.arrival_airport.airport_name}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <div className="flex items-center sm:justify-start">
                    <span className="flex text-gray-500 font-semibold">
                      <IoPerson className="mr-2" /> Jumlah Penumpang:{" "}
                      <span className="text-black ml-2">
                        {pemesanan.total_passengers}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center sm:justify-end">
                    <span
                      className={`flex items-center font-semibold ${
                        pemesanan?.payment?.status === "PAID"
                          ? "text-green-500"
                          : pemesanan?.payment?.status === "PENDING_PAYMENT"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      <IoStatsChartSharp className="mr-2" />
                      Status:{" "}
                      {pemesanan?.payment?.status === "PAID"
                        ? "Lunas"
                        : pemesanan?.payment?.status === "PENDING_PAYMENT"
                        ? "Pending Payment"
                        : "Dibatalkan"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:justify-end p-4">
                {pemesanan?.payment?.status !== "CANCELED" && (
                  <Link
                    to={`/detailriwayat/${pemesanan.booking_code}`}
                    className={`block text-center ${
                      pemesanan?.payment?.status === "PAID"
                        ? "bg-green-500"
                        : pemesanan?.payment?.status === "PENDING_PAYMENT"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0`}
                  >
                    Lihat Detail
                  </Link>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-grow text-black">
              Tidak ada riwayat pemesanan dengan status{" "}
              <span
                className={`font-bold ${
                  filter === "paid"
                    ? "text-green-500"
                    : filter === "pending"
                    ? "text-yellow-500"
                    : filter === "canceled"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {filter === "paid"
                  ? "Lunas"
                  : filter === "pending"
                  ? "Pending"
                  : filter === "canceled"
                  ? "Dibatalkan"
                  : "apa pun"}
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl mb-4">
            Maaf, tidak ada riwayat pemesanan yang sesuai.
          </p>
          <img
            className="max-w-full h-auto mx-auto rounded-lg"
            src={StatusHistory}
            alt="Status Berhasil"
          />
        </div>
      )}
    </div>
  );
}
