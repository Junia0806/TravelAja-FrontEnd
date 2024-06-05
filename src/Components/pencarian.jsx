import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TfiMoney } from "react-icons/tfi";
import { PiHeartFill } from "react-icons/pi";
import { useSpring, animated } from "react-spring";
import { FaPlaneDeparture } from "react-icons/fa";

export function Pencarian() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasilDitemukan, setHasilDitemukan] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const today = new Date();

  const tiket = {
    namaMaskapai: "Citilink",
    kelas: "Ekonomi",
    waktuKeberangkatan: "07.00",
    waktuKedatangan: "08.55",
    bandaraAsal: "Jakarta(CGK)",
    bandaraTujuan: "Denpasar(DPS)",
    durasi: "1jam 55menit",
    harga: "Rp 792.656",
    informasi: {
      penumpang: "2",
      fasilitas: "air mineral",
    },
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  // const handlePilihClick = () => {
  //   // Tampilkan spinner ketika tombol Pilih diklik
  //   setIsLoading(true);

  //   // Lakukan tindakan yang sesuai di sini, misalnya mengirim permintaan ke server

  //   // Setelah tindakan selesai, sembunyikan spinner
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setHasilDitemukan(false);
  //   }, 2000); // Ganti nilai 2000 dengan waktu yang sesuai dengan kebutuhan Anda
  // };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 mt-3 border-b text-center">Pilih Penerbangan</h1>
      <div className="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 p-2 ">
        <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4 text-white font-semibold">
          <h1 className="rounded-md bg-[#00B7C2] p-2 w-full flex items-center text-left">
            <IoMdArrowRoundBack className="mr-2" />
            {tiket.bandaraAsal} ke {tiket.bandaraTujuan} - {tiket.informasi.penumpang} Penumpang - {tiket.kelas}
          </h1>
          <select className="select-cst text-center rounded-md bg-gray-800 p-2 w-full md:w-auto">
            <option value="" disabled selected hidden>
              Urutkan Berdasarkan
            </option>
            <option value="">Harga - Terjangkau</option>
            <option value="">Keberangkatan - Paling Awal</option>
            <option value="">Keberangkatan - Paling Akhir</option>
            <option value="">Kedatangan - Paling Awal</option>
            <option value="">Kedatangan - Paling Akhir</option>
          </select>
        </div>
      </div>

      <div className="mt-1 p-4">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold">Filter :</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-10">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none flex items-center justify-center">
            <PiHeartFill className="mr-2" />
            Fasilitas
          </button>
          <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center">
            <TfiMoney className="mr-2" />
            Harga
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full mt-4">
        <Tabs className="Pills">
          <TabList className="flex justify-around border-b rounded-sm border-gray-300 dark:border-gray-700 bg-white text-[#00B7C2]">
            {days.map((day, index) => {
              const date = new Date(today);
              date.setDate(today.getDate() + index);
              const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
              return (
                <Tab
                  key={index}
                  className={`flex flex-col items-center p-2 text-center cursor-pointer font-semibold dark:border-[#00B7C2] ${activeTab === index ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 hover:text-black"}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="text-sm">{day}</span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{dateString}</span>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel>
            <div className={`p-4 my-4 border border-gray-100 dark:border-gray-700 rounded-md max-w-7xl items-center justify-between ${activeTab === 0 ? "block" : "hidden"} mx-auto`}>
              <div className="mx-8 bg-white shadow-lg rounded-lg outline-1 mb-4">
                <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
                  <p className="flex items-center text-lg font-bold tracking-tight">
                    <img src="https://logowik.com/content/uploads/images/citilink3703.logowik.com.webp" className="h-8 w-8 mr-2 rounded-full" alt="Citilink Logo" />
                    {tiket.namaMaskapai} - {tiket.kelas}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.waktuKeberangkatan}</span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.bandaraAsal}</span>{" "}
                  </div>
                  <div className="flex flex-col items-center col-span-2">
                    <animated.div style={planeAnimation} className="flex flex-col items-center">
                      <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                      <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">{tiket.durasi}</span>
                    </animated.div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.waktuKedatangan}</span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.bandaraTujuan}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4 ">
                  <span className="text-[#00B7C2] text-lg font-bold mt-2 sm:mt-0">{tiket.harga}</span>
                  <Link to="/detailtiket" className="block text-center bg-gray-600 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
                    Lihat
                  </Link>
                </div>
              </div>

              <div className="mx-8 bg-white shadow-lg rounded-lg outline-1 mb-4">
                <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
                  <p className="flex items-center text-lg font-bold tracking-tight">
                    <img src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/11/26/451507063.jpg" className="h-8 w-8 mr-2 rounded-full" alt="Citilink Logo" />
                    {tiket.namaMaskapai} - {tiket.kelas}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.waktuKeberangkatan}</span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.bandaraAsal}</span>{" "}
                  </div>
                  <div className="flex flex-col items-center col-span-2">
                    <animated.div style={planeAnimation} className="flex flex-col items-center">
                      <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
                      <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">{tiket.durasi}</span>
                    </animated.div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.waktuKedatangan}</span>
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">{tiket.bandaraTujuan}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:justify-end sm:items-center p-4 ">
                  <span className="text-[#00B7C2] text-lg font-bold mt-2 sm:mt-0">{tiket.harga}</span>
                  <Link to="/detailtiket" className="block text-center bg-gray-600 hover:bg-gray-800 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none sm:ml-4 mt-4 sm:mt-0">
                    Lihat
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
