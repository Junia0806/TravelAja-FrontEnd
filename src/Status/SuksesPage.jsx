import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import StatusSukses from "../assets/status pesanan/Status Airlines(1).png";
import StatusPending from "../assets/status pesanan/Status Airlines(3).png";
import StatusCancel from "../assets/status pesanan/Status Airlines(2).png";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proceedToPayment } from "../Redux/actions/bookingActions";
import { useParams, useLocation } from "react-router-dom";

const Sukses = () => {
  const dispatch = useDispatch();
  const dataBooking = useSelector((state) => state.booking?.dataBooking);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const { id } = useParams();
  const query = useQuery();
  const orderId = query.get("order_id");
  const statusCode = query.get("status_code");
  const transactionStatus = query.get("transaction_status");

  useEffect(() => {
    dispatch(proceedToPayment);
  }, [dispatch]);

  const getTransactionMessage = (status) => {
    switch (status) {
      case "settlement":
      case "accept":
        return "Tiket berhasil dipesan";
      case "pending":
        return "Pesanan tiket pending";
      case "expire":
        return "Tiket gagal dipesan";
      default:
        return "Status transaksi tidak dikenal";
    }
  };

  const message = getTransactionMessage(transactionStatus);

  const getStatusImage = (status) => {
    switch (status) {
      case "settlement":
      case "accept":
        return StatusSukses;
      case "pending":
        return StatusPending;
      case "expire":
        return StatusCancel;
      default:
        return StatusCancel; // Gambar default jika status tidak dikenal
    }
  };

  // Menentukan ikon berdasarkan transactionStatus
  const getStatusIcon = (status) => {
    switch (status) {
      case "settlement":
      case "accept":
        return <FaCheckCircle className="mr-2 text-[#00B7C2]" />;
      case "pending":
        return <FaClock className="mr-2 text-[#00B7C2]" />;
      case "expire":
        return <FaTimesCircle className="mr-2 text-[#B74D4D]" />;
      default:
        return null;
    }
  };

  return (
    <div className="m-5 lg:mx-20 md:mx-10">
      <div className="mb-6">
        <div className="flex items-center justify-around">
          <span className="flex items-center text-gray-800 font-bold">
            <FaUserPen className="mr-2 text-[#00B7C2]" /> Data
          </span>
          <div className="flex items-center text-gray-800 font-bold">
            <MdOutlinePayment className="mr-2 text-[#00B7C2]" /> Bayar
          </div>
          {transactionStatus === "settlement" ||
          transactionStatus === "accept" ||
          transactionStatus === "pending" ||
          transactionStatus === "expire" ? (
            <div className="flex items-center text-gray-800 font-bold">
              {getStatusIcon(transactionStatus)}
              {transactionStatus === "settlement" ||
              transactionStatus === "accept"
                ? "Selesai"
                : transactionStatus === "pending"
                ? "Pending"
                : "Gagal"}
            </div>
          ) : null}
        </div>
        <div className="relative mt-4">
          {transactionStatus === "pending" || transactionStatus === "expire" ? (
            <>
              <div className="relative mt-4">
                <div className="absolute w-2/3 bg-[#00B7C2] h-1"></div>
                <div className="w-full h-1 bg-gray-300"></div>
              </div>
            </>
          ) : (
            <div className="absolute w-full bg-[#00B7C2] h-1"></div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-grow text-black">
            {message} dengan kode booking {dataBooking.booking_code}
          </h2>
        </div>
        <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl mb-4">
          {transactionStatus === "settlement" || transactionStatus === "accept"
            ? "Silahkan cetak tiket Anda untuk keperluan lebih lanjut"
            : null}
        </p>
        <img
          className="max-w-full h-auto mx-auto rounded-lg"
          src={getStatusImage(transactionStatus)}
          alt={`Status ${transactionStatus}`}
        />
        {transactionStatus === "settlement" ||
        transactionStatus === "accept" ? (
          <Link
            to={`/tiket/${dataBooking.booking_code}`}
            className="block text-center text-white text-sm sm:text-base md:text-lg py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B7C2]"
          >
            Cetak Tiket
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Sukses;
