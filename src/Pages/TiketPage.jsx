/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { QRCode } from 'react-qrcode-logo';
import travelLogo from "../assets/Logo.png";

const Tiket = () => {
  const [booking, setBooking] = useState({
    airline: "Travel Aja",
    flightCode: "TA123",
    name: "John Doe",
    idNumber: "123456789",
    from: "Jakarta (CGK)",
    to: "Bali (DPS)",
    departureTime: "10:00 AM",
    departureDate: "2023-06-15",
    seat: "12A",
    seatClass: "Economy",
    arrivalTerminal: "Terminal 2",
    arrivalTime: "12:00 PM",
    qrCodeValue: "TA123-JohnDoe-12A"
  });

  return (
    <div className="container max-w-5xl mx-auto my-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg flex items-center">
          <img src={travelLogo} alt="Travel Aja Logo" className="w-8 h-8 mr-2" />
          <p className="text-lg flex-1 text-center">Travel Aja</p>
        </div>
        <div className="p-6 bg-gray-50 flex">
          <div className="flex-1 pr-6">
            <div className="mb-4">
              <p className="text-gray-600">
                <i className="fas fa-user mr-2 text-blue-700"></i>
                <strong>Nama Penumpang:</strong> {booking.name}
              </p>
              <p className="text-gray-600">
                <i className="fas fa-id-card mr-2 text-blue-700"></i>
                <strong>Nomor Identitas:</strong> {booking.idNumber}
              </p>
              <p className="text-gray-600">
                <i className="fas fa-plane mr-2 text-blue-700"></i>
                <strong>Maskapai:</strong> {booking.airline}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-600">
                  <i className="fas fa-plane-departure mr-2 text-blue-700"></i>
                  <strong>Bandara Asal:</strong> {booking.from}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-calendar-alt mr-2 text-blue-700"></i>
                  <strong>Tanggal:</strong> {booking.departureDate}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-clock mr-2 text-blue-700"></i>
                  <strong>Jam:</strong> {booking.departureTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <i className="fas fa-chair mr-2 text-blue-700"></i>
                  <strong>No. Kursi:</strong> {booking.seat}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-ticket-alt mr-2 text-blue-700"></i>
                  <strong>Jenis Kursi:</strong> {booking.seatClass}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-plane-arrival mr-2 text-blue-700"></i>
                  <strong>Terminal Kedatangan:</strong> {booking.arrivalTerminal}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-calendar-alt mr-2 text-blue-700"></i>
                  <strong>Tanggal:</strong> {booking.departureDate}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-clock mr-2 text-blue-700"></i>
                  <strong>Jam:</strong> {booking.arrivalTime}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-4">
            <QRCode value={booking.qrCodeValue} size={128} />
            <p className="mt-4 text-gray-600">
              <i className="fas fa-barcode mr-2 text-blue-700"></i>
              <strong>Kode Booking:</strong> {booking.flightCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiket;
