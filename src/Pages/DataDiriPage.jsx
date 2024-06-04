/* eslint-disable no-unused-vars */
import React from 'react';
import BookingForm from '../Components/FormDataDiri';
import DetailPemesanan from '../Components/FormDetailPesananan';
import { FaUserPen } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const DataDiri = () => {
  return (
    <div className="m-5 lg:mx-20 md:mx-0">
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
      <BookingForm />
      <DetailPemesanan />
    </div>
  </div>
  );
};

export default DataDiri;
