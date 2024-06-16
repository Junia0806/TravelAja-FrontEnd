/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { TfiMoney } from "react-icons/tfi";
import { useSpring, animated } from "react-spring";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";

const DetailRiwayat = () => {
  const details = {
    kodepemesanan: "JS123",
    waktuKeberangkatan: "07.00",
    waktuKedatangan: "08.55",
    tanggal: "10 Mei 2024",
    bandaraAsal: "Jakarta(CGK)",
    bandaraTujuan: "Denpasar(DPS)",
    namaMaskapai: "Citilink",
    kelas: "Ekonomi",
    durasi: "1jam 55menit",
    rincianHarga: {
      harga: "792.656",
      totalHarga: "RP 3.170.624",
    },
    penumpang: {
      jumlah: "4",
      penumpang1: "Muhammad Ibrahim",
      penumpang2: "Muhammad Abdurahman",
      ID1: "12345",
      ID2: "67890",
      statusDewasa: "dewasa",
      statusAnak: "anak",
    },
  };

  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Detail Riwayat Pesanan</h1>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg outline-1  w-full my-4 mx-auto border-opacity-50 max-w-4xl mb-4">
          <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
            <p className="text-center text-l font-semibold">Detail Riwayat Pesanan</p>
          </div>
          <div className="p-8">
            <div className="grid-cols-1 sm:grid-cols-4 gap-4 py-4">
              <div className=" relative p-8">
                <div className="mb-4 justify-between items-center">
                  <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" alt="Logo Maskapai" className="absolute top-0 left-0 w-full h-full object-cover opacity-20" />
                  <strong className="flex text-gray-800 text-xl">
                    {details.namaMaskapai} <h1 className="ml-2 font-semibold text-gray-400 text-lg"> - {details.kelas}</h1>
                  </strong>
                  <div>
                    <span className="flex text-black font-bold ">
                      Kode Pemesanan: <h1 className="ml-2 font-semibold text-gray-500">{details.kodepemesanan}</h1>
                    </span>
                  </div>
                </div>
              </div>
              <hr className=" border-1 border-gray-200 mb-4" />
              <div className="mb-2">
                <strong className="text-gray-800 ">Informasi Penerbangan:</strong>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4 md:justify-between md:space-x-4">
                <div className="flex flex-col items-start mb-4 md:mb-0">
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FiClock className="mr-2" /> {details.waktuKeberangkatan}
                  </span>
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FaRegCalendarAlt className="mr-2" /> {details.tanggal}
                  </span>
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FaLocationDot className="mr-2" /> {details.bandaraAsal}
                  </span>
                </div>
                <div className="flex flex-col items-center col-span-2 mb-4 md:mb-0">
                  <animated.div style={planeAnimation} className="flex flex-col items-center">
                    <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                    <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">{details.durasi}</span>
                  </animated.div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FiClock className="mr-2" /> {details.waktuKedatangan}
                  </span>
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FaRegCalendarAlt className="mr-2" /> {details.tanggal}
                  </span>
                  <span className="flex items-center mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                    <FaLocationDot className="mr-2" /> {details.bandaraTujuan}
                  </span>
                </div>
              </div>
              <hr className=" border-1 border-gray-200 mb-4" />
              <div className="col-span-1 mb-4">
                <div className="mb-4">
                  <strong className="text-gray-800">Informasi Penumpang:</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col items-start">
                    <span className="flex items-center text-black font-semibold mb-1">
                      <IoPerson className="mr-2" /> Penumpang 1: <span className="text-gray-500 ml-1">{details.penumpang.penumpang1}</span>
                    </span>
                    <span className="flex items-center text-[#00B7C2] font-bold">
                      ID: {details.penumpang.ID1} <span className="text-gray-400 font-semibold ml-1">- {details.penumpang.statusDewasa}</span>
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center text-black font-semibold mb-1">
                      <IoPerson className="mr-2" /> Penumpang 2: <span className="text-gray-500 ml-1">{details.penumpang.penumpang2}</span>
                    </span>
                    <span className="flex items-center text-[#00B7C2] font-bold">
                      ID: {details.penumpang.ID2} <span className="text-gray-400 font-semibold ml-1">- {details.penumpang.statusAnak}</span>
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center text-black font-semibold mb-1">
                      <IoPerson className="mr-2" /> Penumpang 3: <span className="text-gray-500 ml-1">{details.penumpang.penumpang1}</span>
                    </span>
                    <span className="flex items-center text-[#00B7C2] font-bold">
                      ID: {details.penumpang.ID1} <span className="text-gray-400 font-semibold ml-1">- {details.penumpang.statusAnak}</span>
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center text-black font-semibold mb-1">
                      <IoPerson className="mr-2" /> Penumpang 4: <span className="text-gray-500 ml-1">{details.penumpang.penumpang2}</span>
                    </span>
                    <span className="flex items-center text-[#00B7C2] font-bold">
                      ID: {details.penumpang.ID2} <span className="text-gray-400 font-semibold ml-1">- {details.penumpang.statusDewasa}</span>
                    </span>
                  </div>
                </div>
              </div>

              <hr className=" border-1 border-gray-200 mb-3" />
              <div className="mb-2">
                <div className="mb-4">
                  <strong className="text-gray-800 ">Rincian Harga:</strong>
                </div>
                <span className="flex text-gray-500 font-semibold mb-2">
                  <IoPerson className="mr-2" /> Jumlah Penumpang: <span className="text-black ml-2">{details.penumpang.jumlah} Orang </span>
                </span>
                <span className="flex items-center text-gray-500 font-semibold mb-2">
                  <FaMoneyCheckAlt className="mr-2" /> Harga per Tiket:
                  <span className="text-black ml-2"> RP {details.rincianHarga.harga} Orang</span>
                </span>
              </div>
              <hr className=" border-1 border-gray-200 mb-4" />
              <div className="flex items-center justify-start mb-4">
                <span className="flex items-center mb-2 text-black font-semibold">
                  <TfiMoney className="mr-2 text-black" /> Total Bayar: <h1 className="mr-2 ml-2 font-bold text-[#00B7C2]">{details.rincianHarga.totalHarga}</h1>
                </span>
              </div>
              <div className="flex justify-center ">
                <div className="flex justify-center w-full max-w-4xl">
                  <Link to="/riwayatpesanan" className="flex-grow text-center bg-gray-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-gray-800 focus:outline-none mx-2">
                    Kembali
                  </Link>
                  <Link to="/tiket" className="flex-grow text-center bg-green-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-gray-800 focus:outline-none mx-2">Cetak Tiket</Link>
                  {/* <Link className="flex-grow text-center bg-red-500 text-white font-bold text-l py-2 px-6 rounded-md hover:bg-gray-800 focus:outline-none mx-2">Lanjutkan Pembayaran</Link> */}
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
