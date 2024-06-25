/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeat } from "../Redux/actions/flightAction";
import { proceedToPayment } from "../Redux/actions/bookingActions";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Proces() {
  const dispatch = useDispatch();
  const seatClassId = useSelector(
    (state) => state.flights.data?.seatclass?.seat_class_id
  );
  const seat = useSelector((state) => state.flights.seat);
  const data_flight = useSelector((state) => state.flights.data);
  const token = useSelector((state) => state.auth.token);
  const dataBooking = useSelector((state) => state.booking?.dataBooking);
  console.log("dataBooking :>> ", dataBooking);
  console.log("seat :>> ", seat);
  console.log("token :>> ", token);

  useEffect(() => {
    if (seatClassId) {
      dispatch(fetchSeat(seatClassId));
    }
  }, [dispatch, seatClassId]);

  const [passengers, setPassengers] = useState([
    {
      fullname: "junia",
      passenger_type: "Dewasa", 
      born_date: "2003-06-08",
      identity_number: "35151148060001",
      seat_id: 0,
    },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];

    if (name === "seat_id") {
      const selectedSeatId = parseInt(value, 10);
      const isSeatAlreadySelected = passengers.some(
        (passenger, idx) =>
          passenger.seat_id === selectedSeatId && idx !== index
      );

      if (isSeatAlreadySelected) {
        Swal.fire({
          icon: "error",
          title: "Kursi yang dipilih tidak boleh sama",
          text: "Silakan pilih kursi yang berbeda.",
        });
        return;
      }

      updatedPassengers[index][name] = selectedSeatId;
    } else {
      updatedPassengers[index][name] = value;
    }

    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      flight_id: data_flight.flight_id,
      passengers,
    };

    // Validasi semua data penumpang sudah benar
    const isDataValid = passengers.every(
      (passenger) =>
        passenger.fullname &&
        passenger.born_date &&
        passenger.identity_number &&
        passenger.seat_id !== 0
    );

    if (!isDataValid) {
      Swal.fire({
        icon: "error",
        title: "Data penumpang belum lengkap",
        text: "Silakan lengkapi semua data penumpang sebelum melanjutkan.",
      });
      return;
    }

    // Jika semua data sudah lengkap, tampilkan konfirmasi
    Swal.fire({
      title: "Apakah data yang anda inputkan sudah benar?",
      text: "Periksa kembali sebelum melanjutkan ke pembayaran.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lanjut ke Pembayaran",
      cancelButtonText: "Periksa Kembali",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(proceedToPayment(payload, token));
      }
    });
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        fullname: "",
        passenger_type: "Adult",
        born_date: "",
        identity_number: "",
        seat_id: 0,
      },
    ]);
  };

  const removePassenger = (index) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus penumpang ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPassengers = [...passengers];
        updatedPassengers.splice(index, 1);
        setPassengers(updatedPassengers);
        Swal.fire({
          icon: "success",
          title: "Penumpang berhasil dihapus",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="m-5 lg:mx-20 md:mx-0">
      {/* Tampilan Step Header */}
      <div className="mb-6">
        <div className="flex items-center justify-around">
          <span className="flex items-center text-gray-800 font-bold">
            <FaUserPen className="mr-2 text-[#00B7C2]" /> Data
          </span>
          <div className="flex items-center text-gray-500">
            <MdOutlinePayment className="mr-2" /> Bayar
          </div>
          <div className="flex items-center text-gray-500">
            <FaCheckCircle className="mr-2" /> Selesai
          </div>
        </div>
        <div className="relative mt-4">
          <div className="absolute w-1/3 bg-[#00B7C2] h-1"></div>
          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="container mx-auto p-4 ">
          <div className="max-w-lg mx-auto overflow-hidden bg-white shadow-lg rounded-lg outline-1">
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-4">
                <div>
                  <div className="bg-gray-500 text-white py-3 px-4 flex justify-between items-center">
                    <p className="text-l font-semibold">
                      Data Diri Penumpang {index + 1}
                    </p>
                    {index > 0 && (
                      <button
                        onClick={() => removePassenger(index)}
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 focus:outline-none"
                      >
                        Hapus Penumpang
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={passenger.fullname}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(event) => handleChange(index, event)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        name="born_date"
                        value={passenger.born_date}
                        onChange={(event) => handleChange(index, event)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        No KTP atau Paspor
                      </label>
                      <input
                        type="text"
                        name="identity_number"
                        value={passenger.identity_number}
                        onChange={(event) => handleChange(index, event)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Pilihan Dewasa/Anak-anak
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          name="passenger_type"
                          value={passenger.passenger_type}
                          onChange={(event) => handleChange(index, event)}
                        >
                          <option value="Dewasa">Dewasa</option>
                          <option value="Anak-Anak">Anak-anak</option>
                          <option value="Bayi">Bayi</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Pilihan Nomor Kursi
                      </label>
                      <div className="relative">
                        <select
                          name="seat_id"
                          value={passenger.seat_id}
                          onChange={(event) => handleChange(index, event)}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value={0}>Pilih Nomor Kursi</option>
                          {seat?.data?.map((seatItem) => (
                            <option
                              key={seatItem.seat_id}
                              value={seatItem.seat_id}
                              className={`${
                                seatItem.status !== "AVAILABLE"
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              disabled={seatItem.status !== "AVAILABLE"}
                            >
                              Nomor: {seatItem.seat_number} | {seatItem.status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link
              onClick={handleAddPassenger}
              className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Tambah Penumpang
            </Link>
          </div>
        </div>
        {/* Tampilan Detail Pesanan */}
        <div className="container mx-auto p-4">
          <div className="mx-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
              <p className="text-center text-l font-semibold">Detail Pesanan</p>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <span className="block text-gray-600">
                  <i className="fa-solid fa-clock mr-2"></i>
                  {formatTime(data_flight?.departure_time)}{" "}
                  <i className="fa-solid fa-calendar mr-2"></i>
                  {formatDate(data_flight?.departure_time)}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane-departure mr-2"></i>
                  {data_flight?.destination_airport?.airport_name}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane-arrival mr-2"></i>
                  {data_flight?.arrival_airport?.airport_name}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane mr-2"></i>
                  {data_flight?.airlines?.airline_name} |{" "}
                  {data_flight?.flight_id}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-chair mr-2"></i>
                  {data_flight?.seatclass?.seat_class_type}
                </span>
                <hr className="border-1 border-gray-200 mt-3"></hr>
              </div>
              <div className="mb-6">
                <strong className="text-gray-800">Informasi:</strong>
                <div className="ml-4 text-gray-600">
                  <div>
                    <i className="fa-solid fa-briefcase mr-2"></i>
                    Kabin: {data_flight?.airlines?.cabin_baggage}
                  </div>
                  <div>
                    <i className="fa-solid fa-luggage-cart mr-2"></i>
                    Bagasi: {data_flight?.airlines?.baggage}
                  </div>
                </div>
                <hr className="border-1 border-gray-200 mt-3"></hr>
              </div>
              <div className="mb-6">
                <strong className="text-gray-800">Rincian Harga:</strong>
                <div className="ml-4 text-gray-600">
                  <div className="mb-2">
                    <i className="fa-solid fa-user mr-2"></i>
                    Jumlah Penumpang:{" "}
                    <span className="text-gray-800 font-semibold">
                      {passengers.length} Orang
                    </span>
                  </div>
                  <div className="mb-2">
                    <i className="fa-solid fa-ticket mr-2"></i>
                    Harga per Orang:{" "}
                    <span className="text-gray-800 font-semibold">
                      Rp.{data_flight.total_price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2">
                    <i className="fa-solid fa-dollar-sign mr-2"></i>
                    Total:{" "}
                    <span className="text-gray-800 font-bold text-xl">
                      Rp.
                      {(
                        passengers.length * data_flight.total_price
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleSubmit}
                >
                  Lanjut Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proces;
