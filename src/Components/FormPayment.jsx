/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCard = () => {
  const booking = {
    bookingCode: 'AB123456',
    time: '10:00 AM',
    date: '2023-06-01',
    originTerminal: 'Terminal 1',
    destinationTerminal: 'Terminal 2',
    airlineInfo: 'Garuda Indonesia',
    baggage: '20 kg',
    cabin: 'Economy',
    arrivalTime: '12:00 PM',
    arrivalAirport: 'Soekarno-Hatta International Airport',
    paymentMethod: 'Credit Card',
    priceDetails: {
      adult: 'IDR 1,500,000',
      child: 'IDR 750,000',
      total: 'IDR 2,250,000',
    },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-8 bg-white shadow-lg rounded-lg">
        <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg font-semibold">Isi Data Pembayaran</p>
        </div>
        <div className="p-8">
          <div className="mb-4">
            <span className="block text-gray-600">
              <i className="fa-solid fa-code mr-2"></i>
              Booking Code: <span className="font-bold">{booking.bookingCode}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-clock mr-2"></i>
              Jam: <span className="font-bold">{booking.time}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-calendar mr-2"></i>
              Tanggal: <span className="font-bold">{booking.date}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane-departure mr-2"></i>
              Terminal Asal: <span className="font-bold">{booking.originTerminal}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane-arrival mr-2"></i>
              Terminal Tujuan: <span className="font-bold">{booking.destinationTerminal}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane mr-2"></i>
              Maskapai: <span className="font-bold">{booking.airlineInfo}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-briefcase mr-2"></i>
              Baggasi: <span className="font-bold">{booking.baggage}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-chair mr-2"></i>
              Kabin: <span className="font-bold">{booking.cabin}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-clock mr-2"></i>
              Kedatangan: <span className="font-bold">{booking.arrivalTime}</span>
            </span>
            <span className="block text-gray-600">
              <i className="fa-solid fa-plane-arrival mr-2"></i>
              Bandara Kedatangan: <span className="font-bold">{booking.arrivalAirport}</span>
            </span>
            <hr className="border-t border-gray-200 mt-3" />
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Pilihan Metode Pembayaran:</strong>
            <div className="ml-4 text-gray-600">
              <i className="fa-solid fa-credit-card mr-2"></i>
              {booking.paymentMethod}
            </div>
            <hr className="border-t border-gray-200 mt-3" />
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Rincian Harga:</strong>
            <div className="ml-4 text-gray-600">
              <div>
                <i className="fa-solid fa-user mr-2"></i>
                Dewasa: <span className="text-gray-800 font-bold">{booking.priceDetails.adult}</span>
              </div>
              <div>
                <i className="fa-solid fa-child mr-2"></i>
                Anak: <span className="text-gray-800 font-bold">{booking.priceDetails.child}</span>
              </div>
              <div>
                <i className="fa-solid fa-dollar-sign mr-2"></i>
                Total: <span className="text-gray-800 font-bold">{booking.priceDetails.total}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Link
              to="/payment"
              className="block text-center bg-[#00B7C2] text-white font-bold text-lg py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              Bayar Sekarang
            </Link>
            <Link
              to="/payment"
              className="block text-center bg-gray-800 text-white font-bold text-lg py-2 px-4 rounded-md hover:bg-[#00B7C2] focus:outline-none"
            >
              Bayar Nanti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
