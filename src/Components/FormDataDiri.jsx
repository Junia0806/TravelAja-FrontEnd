/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookingForm = () => {
  const seatOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
  const [passengers, setPassengers] = useState([{ id: 1 }]);

  const addPassenger = () => {
    setPassengers([...passengers, { id: passengers.length + 1 }]);
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter((passenger) => passenger.id !== id));
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="max-w-lg mx-auto overflow-hidden bg-white shadow-lg rounded-lg outline-1">
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="mb-4">
            {/* Data Diri Penumpang */}
            <div>
              <div className="bg-gray-500 text-white py-3 px-4 flex justify-between items-center">
                <p className="text-l font-semibold">Data Diri Penumpang {index + 1}</p>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`fullName${index}`}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name={`fullName${index}`}
                    id={`fullName${index}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`birthDate${index}`}>
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name={`birthDate${index}`}
                    id={`birthDate${index}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`idNumber${index}`}>
                    No KTP atau Paspor
                  </label>
                  <input
                    type="text"
                    name={`idNumber${index}`}
                    id={`idNumber${index}`}
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
                      name={`passengerType${index}`}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="adult">Dewasa</option>
                      <option value="child">Anak-anak</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`seatNumber${index}`}>
                    Pilihan Nomor Kursi
                  </label>
                  <div className="relative">
                    <select
                      name={`seatNumber${index}`}
                      id={`seatNumber${index}`}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Pilih Nomor Kursi</option>
                      {seatOptions.map((seat, seatIndex) => (
                        <option key={seatIndex} value={seat}>
                          {seat}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
  );
};

export default BookingForm;
