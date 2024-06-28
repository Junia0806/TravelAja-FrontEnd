import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaLocationDot,
  FaRegCalendar,
  FaPlaneDeparture,
  FaMoneyCheck,
  FaRegIdCard,
  FaChair,
  FaUserTag,
} from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { TfiMoney } from "react-icons/tfi";
import { useSpring, animated } from "react-spring";
import { fetchDetailBooking } from "../Redux/actions/bookingActions";
import { useDispatch, useSelector } from "react-redux";

const DetailRiwayat = () => {
  const dispatch = useDispatch();
  const bookingCode = useParams();
  const details = useSelector((state) => state.booking.dataHistory);

  useEffect(() => {
    if (bookingCode.booking_code) {
      dispatch(fetchDetailBooking(bookingCode.booking_code));
    }
  }, [dispatch, bookingCode.booking_code]);

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

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  const isPaid = details?.payment?.status === "PAID";
  const isPending = details?.payment?.status === "PENDING_PAYMENT";
  const isCancelled = details?.payment?.status === "CANCELED";

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg outline-1 w-full my-4 mx-auto border-opacity-50 max-w-4xl mb-4">
          <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
            <p className="text-center text-l font-semibold">
              Detail Riwayat Pesanan
            </p>
          </div>
          <div className="p-8">
            <div className="grid-cols-1 sm:grid-cols-4 gap-4 py-4">
              {details && (
                <div key={details?.booking_id} className="relative p-8">
                  <img
                    src={details?.flight?.airlines?.url_logo || ""}
                    alt="Logo Maskapai"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                  />
                  <strong className="flex text-gray-800 text-xl">
                    {details?.flight?.airlines?.airline_name || ""}
                    <h1 className="ml-2 font-semibold text-gray-400 text-lg">
                      - {details?.flight?.flight_id}
                    </h1>
                  </strong>
                  <div>
                    <span className="flex text-black font-bold">
                      Kode Pemesanan:
                      <h1 className="ml-2 font-semibold text-gray-500">
                        {details?.booking_code}
                      </h1>
                    </span>
                    <span className="flex text-black font-bold">
                      Tanggal Pemesanan:
                      <h1 className="ml-2 font-semibold text-gray-500">
                        {formatDate(details?.booking_date)}
                      </h1>
                    </span>
                  </div>
                </div>
              )}

              <hr className="border-1 border-gray-200 mb-4" />
              <div className="mb-2">
                <strong className="text-gray-800">
                  Informasi Penerbangan:
                </strong>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4 md:justify-between md:space-x-4">
                <React.Fragment key={details?.booking_id}>
                  <div className="flex flex-col items-start mb-4 md:mb-0">
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FiClock className="mr-2" />{" "}
                      {formatTime(details?.flight?.departure_time)}
                    </span>
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaRegCalendar className="mr-2" />{" "}
                      {formatDate(details?.flight?.departure_time)}
                    </span>
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />{" "}
                      {details?.flight?.destination_airport?.airport_name}
                    </span>
                  </div>
                  <div className="flex flex-col items-center col-span-2 mb-4 md:mb-0">
                    <animated.div
                      style={planeAnimation}
                      className="flex flex-col items-center"
                    >
                      <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                      <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">
                        {details?.durasi}
                      </span>
                    </animated.div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FiClock className="mr-2" />{" "}
                      {formatTime(details?.flight?.arrival_time)}
                    </span>
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaRegCalendar className="mr-2" />{" "}
                      {formatDate(details?.flight?.arrival_time)}
                    </span>
                    <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                      <FaLocationDot className="mr-2" />{" "}
                      {details?.flight?.arrival_airport?.airport_name}
                    </span>
                  </div>
                </React.Fragment>
              </div>
              <hr className="border-1 border-gray-200 mb-4" />
              <div className="col-span-1 mb-4">
                <div className="mb-4">
                  <strong className="text-gray-800">
                    Informasi Penumpang:
                  </strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <React.Fragment key={details?.booking_id}>
                    {details?.total_passengers === 1 && (
                      <div className="flex flex-col items-start">
                        <span className="flex items-center text-black font-semibold mb-1">
                          <IoPerson className="mr-2" /> Penumpang 1:
                          <span className="text-gray-500 ml-1">
                            {details?.passengers[0]?.fullname}
                          </span>
                        </span>
                        <span className="flex items-center text-[#00B7C2] font-bold mb-1">
                          <FaRegIdCard className="mr-2" /> No. Identitas:{" "}
                          {details?.passengers[0]?.identity_number}
                        </span>
                        <span className="flex items-center text-[#00B7C2] font-bold mb-1">
                          <FaChair className="mr-2" /> Seat Number:{" "}
                          {details?.passengers[0]?.ticket?.seat?.seat_number}
                        </span>
                        <span className="flex items-center text-[#00B7C2] font-bold">
                          <FaUserTag className="mr-2" /> Type:{" "}
                          {details?.passengers[0]?.passenger_type}
                        </span>
                      </div>
                    )}
                    {details?.total_passengers > 1 &&
                      details?.passengers.map((passenger, index) => (
                        <div key={index} className="flex flex-col items-start">
                          <span className="flex items-center text-black font-semibold mb-1">
                            <IoPerson className="mr-2" /> Penumpang {index + 1}:
                            <span className="text-gray-500 ml-1">
                              {passenger?.fullname}
                            </span>
                          </span>
                          <span className="flex items-center text-[#00B7C2] font-bold mb-1">
                            <FaRegIdCard className="mr-2" /> No. Identitas:{" "}
                            {passenger?.identity_number}
                          </span>
                          <span className="flex items-center text-[#00B7C2] font-bold mb-1">
                            <FaChair className="mr-2" /> Seat Number:{" "}
                            {passenger?.ticket.seat.seat_number}
                          </span>
                          <span className="flex items-center text-[#00B7C2] font-bold">
                            <FaUserTag className="mr-2" /> Type:{" "}
                            {passenger?.passenger_type}
                          </span>
                        </div>
                      ))}
                  </React.Fragment>
                </div>
              </div>
              <hr className="border-1 border-gray-200 mb-3" />
              <div className="mb-2">
                <div className="mb-4">
                  <strong className="text-gray-800">Rincian Harga:</strong>
                </div>
                <React.Fragment key={details?.booking_id}>
                  <span className="flex text-gray-500 font-semibold mb-2">
                    <IoPerson className="mr-2" /> Jumlah Penumpang:
                    <span className="text-black ml-2">
                      {details?.total_passengers}
                    </span>
                  </span>
                  <span className="flex items-center text-gray-500 font-semibold mb-2">
                    <FaMoneyCheck className="mr-2" /> Harga per Tiket:
                    <span className="text-black ml-2">
                      Rp {details?.flight?.total_price.toLocaleString("id-ID")}{" "}
                    </span>
                  </span>
                </React.Fragment>
              </div>
              <hr className="border-1 border-gray-200 mb-4" />
              <div className="flex items-center justify-start mb-4">
                <span
                  key={details?.booking_id}
                  className="flex items-center mb-2 text-black font-semibold"
                >
                  <TfiMoney className="mr-2 text-black" /> Total Bayar:
                  <h1 className="mr-2 ml-2 font-bold text-[#00B7C2]">
                    Rp {details?.payment?.total_price.toLocaleString("id-ID")}
                  </h1>
                </span>
              </div>
              <div className="flex justify-center">
                <div className="flex justify-center w-full max-w-4xl">
                  <Link
                    to="/riwayat"
                    className="flex-grow text-center bg-gray-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-gray-800 focus:outline-none mx-2"
                  >
                    Kembali
                  </Link>
                  {isPaid && (
                    <Link
                      to={`/tiket/${bookingCode.booking_code}`}
                      className="flex-grow text-center bg-blue-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-gray-800 focus:outline-none mx-2"
                    >
                      Cetak Tiket
                    </Link>
                  )}
                  {isPending && (
                    <Link
                      to={`/bayar/${ bookingCode.booking_code}`}
                      className="flex-grow text-center bg-red-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-red-800 focus:outline-none mx-2"
                    >
                      Lanjut Pembayaran
                    </Link>
                  )}
                  {isCancelled && <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRiwayat;
