/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const BookingStep1 = () => {
  const id = useParams();
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [seats, setSeats] = useState([]); // State untuk menyimpan data kursi
  const [passengers, setPassengers] = useState([{ id: 1 }]);

  console.log("token :>> ", token);
  console.log("id.id :>> ", id.id);
  console.log("flight :>> ", flight);
  console.log("seat class id :>> ", flight?.seat_class_id);
  console.log("seats :>> ", seats);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseFlight = await axios.get(
          `https://expressjs-develop.up.railway.app/api/v1/flights/${id.id}`
        );
        const flightData = responseFlight.data.data;
        setFlight(flightData);
        console.log("Flight data:", flightData);

        // Ambil seat_class_id dari flight data
        const seatClassId = flightData.seat_class_id;

        // Gunakan seatClassId untuk request ke endpoint seat
        const responseSeats = await axios.get(
          `https://expressjs-develop.up.railway.app/api/v1/seat/${seatClassId}`
        );
        setSeats(responseSeats.data.data);
        console.log("Seat data:", responseSeats.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, token]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const responsebooking = await axios.post(
        "https://expressjs-develop.up.railway.app/api/v1/booking",
        { flight_id: id.id }, //kirim request
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // header Authorization dengan token
          },
        }
      );
      console.log("Response booking", responsebooking.data);
      console.log("Response message", responsebooking.data.message);
      console.log(
        "Response booking.booking_code",
        responsebooking.data.data.booking_code
      );
      console.log(
        "Response booking.booking_id",
        responsebooking.data.data.booking_id
      );
    } catch (error) {
      console.error("Error during booking:", error);
      console.error("Error response from server:", error.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { id: passengers.length + 1 }]);
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter((passenger) => passenger.id !== id));
  };

  const handlePassengerChange = (index, event) => {
    const { name, value } = event.target;
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value
      };
      return updatedPassengers;
    });
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
              <div key={passenger.id} className="mb-4">
                {/* Data Diri Penumpang */}
                <div>
                  <div className="bg-gray-500 text-white py-3 px-4 flex justify-between items-center">
                    <p className="text-l font-semibold">
                      Data Diri Penumpang {index + 1}
                    </p>
                    {index > 0 && (
                      <button
                        onClick={() => removePassenger(passenger.id)}
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 focus:outline-none"
                      >
                        Hapus Penumpang
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`fullName${index}`}
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name={`fullName${index}`}
                        id={`fullName${index}`}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={passenger.fullName || ""}
                        onChange={(event) =>
                          handlePassengerChange(index, event)
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`birthDate${index}`}
                      >
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        name={`birthDate${index}`}
                        id={`birthDate${index}`}
                        value={passenger.birthDate || ""}
                        onChange={(event) =>
                          handlePassengerChange(index, event)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`idNumber${index}`}
                      >
                        No KTP atau Paspor
                      </label>
                      <input
                        type="text"
                        name={`idNumber${index}`}
                        id={`idNumber${index}`}
                        value={passenger.idNumber || ""}
                        onChange={(event) =>
                          handlePassengerChange(index, event)
                        }
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
                          name={`passengerType`}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={passenger.passengerType || "adult"}
                          onChange={(event) =>
                            handlePassengerChange(index, event)
                          }
                        >
                          <option value="adult">Dewasa</option>
                          <option value="child">Anak-anak</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor={`seatNumber${index}`}
                      >
                        Pilihan Nomor Kursi
                      </label>
                      <div className="relative">
                        <select
                          name={`seatNumber${index}`}
                          id={`seatNumber${index}`}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Pilih Nomor Kursi</option>
                          {seats.map((seat) => (
                            <option
                              key={seat.seat_id}
                              value={seat.seat_number}
                              className={`${
                                seat.status !== "AVAILABLE" ? "bg-gray-200" : ""
                              }`}
                              disabled={seat.status !== "AVAILABLE"}
                            >
                              Nomor: {seat.seat_number} | {seat.status}
                            </option>
                          ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link
              onClick={addPassenger}
              className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Tambah Penumpang <i className="fa-solid fa-user-plus"></i>
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
                  {formatTime(flight?.departure_time)}{" "}
                  <i className="fa-solid fa-calendar mr-2"></i>
                  {formatDate(flight?.departure_time)}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane-departure mr-2"></i>
                  {flight?.destination_airport?.airport_name}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane-arrival mr-2"></i>
                  {flight?.arrival_airport?.airport_name}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-plane mr-2"></i>
                  {flight?.airlines?.airline_name} | {flight?.flight_id}
                </span>
                <span className="block text-gray-600">
                  <i className="fa-solid fa-chair mr-2"></i>
                  {flight?.seatclass?.seat_class_type}
                </span>
                <hr className="border-1 border-gray-200 mt-3"></hr>
              </div>
              <div className="mb-6">
                <strong className="text-gray-800">Informasi:</strong>
                <div className="ml-4 text-gray-600">
                  <div>
                    <i className="fa-solid fa-briefcase mr-2"></i>
                    Kabin: {flight?.airlines?.cabin_baggage} kg
                  </div>
                  <div>
                    <i className="fa-solid fa-luggage-cart mr-2"></i>
                    Bagasi: {flight?.airlines?.baggage} kg
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
                      Rp.{flight.total_price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2">
                    <i className="fa-solid fa-dollar-sign mr-2"></i>
                    Total:{" "}
                    <span className="text-gray-800 font-bold text-xl">
                      Rp.
                      {(passengers.length * flight.total_price).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleBooking}
                >
                  Lanjut Pembayaran
                </button>
                {/* <Link to="/bayar" className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Lanjut Pembayaran
            </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep1;
