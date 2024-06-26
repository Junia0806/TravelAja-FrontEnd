/* eslint-disable no-unused-vars */
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import StatusPending from "../assets/status pesanan/Status Airlines(3).png";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proceedToPayment } from "../Redux/actions/bookingActions";

const Pending = () => {
  const dispatch = useDispatch();
  const dataBooking = useSelector((state) => state.booking?.dataBooking);

  useEffect(() => {
    dispatch(proceedToPayment);
  }, [dispatch]);

  return (
    <div className="m-5 lg:mx-20 md:mx-10">
      <div className="mb-6">
        <div className="flex items-center justify-around">
          <span className="flex items-center text-gray-800 font-bold">
            <FaUserPen className="mr-2 text-[#00B7C2]" /> Data
          </span>
          <div className="flex items-center text-gray-800 font-bold">
            <MdOutlinePayment className="mr-2 text-[#00B7C2]" /> Pembayaran
          </div>
          <div className="flex items-center text-gray-800 font-bold">
            <i className="fa-regular fa-hourglass-half mr-2 text-gray-600"></i>{" "}
            Selesai
          </div>
        </div>
        <div className="relative mt-4">
          <div className="absolute w-2/3 bg-[#00B7C2] h-1"></div>
          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-grow text-black">
            Tiket {dataBooking?.booking_code} Pending
          </h2>
        </div>
        <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl mb-4">
          Terjadi kendala dalam proses pembayaran Anda.
          <br /> Mohon periksa kembali metode pembayaran Anda atau coba lagi
          nanti.
        </p>

        <img
          className="max-w-full h-auto mx-auto rounded-lg"
          src={StatusPending}
          alt="Status Pending"
        />
        <Link
          to={`/bayar/${dataBooking.flight_id}`}
          className="block text-center text-white text-sm sm:text-base md:text-lg py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B7C2]"
        >
          Periksa Pembayaran
        </Link>
      </div>
    </div>
  );
};

export default Pending;
