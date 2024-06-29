import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPerson, IoStatsChartSharp } from "react-icons/io5";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../Redux/actions/bookingActions";
import StatusHistory from "../assets/status pesanan/Status Airlines(4).png";

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
          return (
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
    : [];

  return (
    <div className="w-full">
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
          <div className="relative flex-grow">
            <input
              type="text"
              className="border-[1px] outline-none w-full focus:border-[1px] focus:border-black border-gray-300 px-4 py-2 rounded-md"
              placeholder="Cari"
              value={search}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 ">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      {filteredBooking.length > 0 ? (
        filteredBooking.map((pemesanan) => (
          <div
            key={pemesanan.booking_id}
            className="flight-ticket-card shadow-lg border rounded-md px-6 py-4 text-sm text-black dark:text-white font-bold w-full my-4 mx-auto border-opacity-50 max-w-4xl"
          >
            <div className="flex items-center justify-between">
              <p className="flex items-center text-lg font-bold tracking-tight">
                <img
                  src={pemesanan.flight.airlines.url_logo}
                  className="h-8 w-8 mr-2 rounded-full"
                  alt="Airlines Logo"
                />
                {pemesanan.flight.flight_id}
              </p>
              <div className="flex items-center">
                <h1 className="text-gray-700 dark:text-gray-400 font-semibold mr-2">
                  Total Harga:
                </h1>
                <p className="text-[#00B7C2] font-bold">
                  Rp {pemesanan.payment.total_price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="border-b-2 border-[#00B7C2] my-2"></div>
            <div className="flex flex-col md:flex-row justify-between my-3">
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-black font-bold mr-2">Kode Pemesanan:</h1>
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
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center justify-center">
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />
                      {pemesanan.flight.destination_airport.airport_name}
                    </span>
                  </div>
                  <FaArrowRight className="text-gray-700 mx-2 justify-self-center" />
                  <div className="flex items-center justify-center">
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />
                      {pemesanan.flight.arrival_airport.airport_name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="flex text-gray-500 font-semibold mb-2">
                      <IoPerson className="mr-2" /> Jumlah Penumpang:{" "}
                      <span className="text-black ml-2">
                        {pemesanan.total_passengers}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`flex items-center mb-2 font-semibold ${
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
            <div className="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4">
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
        ))
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
            Maaf, kami tidak menemukan riwayat pemesanan yang sesuai dengan
            kriteria pencarian Anda.
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
