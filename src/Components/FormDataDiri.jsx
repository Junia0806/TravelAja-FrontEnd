/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookingForm = () => {
  const seatOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

  return (
    <div className="container mx-auto p-4 ">
      <div className="max-w-lg mx-auto overflow-hidden bg-white shadow-lg rounded-lg outline-1">
        {/* Data Pemesan */}
        <div className="bg-gray-400 text-white py-3 px-4 rounded-t-lg">
          <p className=" text-l font-semibold">Data Diri Pemesan</p>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        
        {/* Pemisah */}
        <div className="border-t border-gray-300"></div>
        
        {/* Data Diri Penumpang */}
        <div>
          <div className="bg-gray-400 text-white py-3 px-4">
            <p className="text-l font-semibold">Data Diri Penumpang</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idNumber">
                No KTP atau Paspor
              </label>
              <input
                type="text"
                name="idNumber"
                id="idNumber"
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
                  name="passengerType"
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seatNumber">
                Pilihan Nomor Kursi
              </label>
              <div className="relative">
                <select
                  name="seatNumber"
                  id="seatNumber"
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Pilih Nomor Kursi</option>
                  {seatOptions.map((seat, index) => (
                    <option key={index} value={seat}>
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
            <Link className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none">
                   Tambah Penumpang  <i className="fa-solid fa-user-plus"></i>
                  </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
