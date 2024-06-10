/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import foto from "../assets/destinasi/destinasi.jpg";
import foto2 from "../assets/destinasi/bali.webp";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [formData, setFormData] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureDate: "",
    passengers: 1,
    seatClass: "Economy",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, [location, navigate]);

  const handleSearch = (event) => {
    event.preventDefault();
    const results = [
      "Soekarno-Hatta International Airport",
      "Ngurah Rai International Airport",
      "Juanda International Airport",
    ].filter((airport) =>
      airport.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-landing">
        <div className="max-w-5xl w-full mx-auto mt-5 p-8 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-center flex-grow text-white">
              Temukan Penerbangan Terbaikmu{" "}
              <i className="fa-solid fa-plane-up"></i>
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="mb-4">
              <label
                htmlFor="departureAirport"
                className="block text-white font-semibold mb-2"
              >
                Asal <i className="fa-solid fa-plane-departure"></i>
              </label>
              <input
                onClick={() => setOpenModal(true)}
                type="text"
                id="departureAirport"
                name="departureAirport"
                value={formData.departureAirport}
                onChange={handleChange}
                placeholder="Soekarno-Hatta"
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="arrivalAirport"
                className="block text-white font-semibold mb-2"
              >
                Tujuan <i className="fa-solid fa-plane-arrival"></i>
              </label>
              <input
                onClick={() => setOpenModal(true)}
                type="text"
                id="arrivalAirport"
                name="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={handleChange}
                placeholder="Ngurah Rai"
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="departureDate"
                className="block text-white font-semibold mb-2"
              >
                Berangkat
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seatClass"
                className="block text-white font-semibold mb-2"
              >
                Kelas
              </label>
              <select
                id="seatClass"
                name="seatClass"
                value={formData.seatClass}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Economy">Ekonomi</option>
                <option value="Business">Bisnis</option>
                <option value="First">Utama</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-4">
              <Link
                to="/pencarian"
                className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Cari Penerbangan{" "}
                <i className="fa-solid fa-magnifying-glass ml-2"></i>
              </Link>
            </div>
          </form>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Pencarian Bandara</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSearch}>
              <div className="mb-4">
                <label
                  htmlFor="searchQuery"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nama Bandara
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Masukkan nama bandara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Button type="submit">Cari</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Batal
                </Button>
              </div>
            </form>
            <div className="mt-6">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} className="mb-2 text-gray-700">
                      {result}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Tidak ada hasil ditemukan</p>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {/* Section 2 */}
        <div>
          <div className="mx-auto px-4 py-10 bg-white">
            <h1 className="font-bold text-3xl text-center text-gray-800">
              Destinasi Terfavorit
            </h1>
            {/* Button Filter */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-10">
              <button className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Semua
              </button>
              <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Surabaya
              </button>
              <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Jakarta
              </button>
              <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800  focus:outline-none flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Jogja
              </button>
              <button className="bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass mr-2"></i> Bali
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* CARD */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="bg-[#00B7C2] text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    Destinasi Jawa Tengah
                  </p>
                </div>
                <img src={foto} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-1 text-black">
                    Surabaya <i className="fa-solid fa-arrow-right"></i> Jogja
                  </p>
                  <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                    <p className="font-medium text-black">
                      <i className="fa-solid fa-plane-circle-check"></i>{" "}
                      Citilink
                    </p>
                    <p className="font-medium text-black">
                      <i className="fa-regular fa-calendar"></i> 30 Mei 2024
                    </p>
                  </div>
                  <p className="text-center text-red-600 mb-4">
                    Harga Diskon:{" "}
                    <span className="font-bold text-lg">Rp 750.000</span>
                  </p>
                  <Link
                    to="/detail-fav"
                    className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="bg-[#00B7C2] text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    Destinasi Bali
                  </p>
                </div>
                <img src={foto2} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-1 text-black">
                    Jakarta <i className="fa-solid fa-arrow-right"></i> Bali
                  </p>
                  <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                    <p className="font-medium text-black">
                      <i className="fa-solid fa-plane-circle-check"></i> Garuda
                    </p>
                    <p className="font-medium text-black">
                      <i className="fa-regular fa-calendar"></i> 30 Mei 2024
                    </p>
                  </div>
                  <p className="text-center text-red-600 mb-4">
                    Harga Diskon:{" "}
                    <span className="font-bold text-lg">Rp 1.450.000</span>
                  </p>
                  <Link className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800  focus:outline-none">
                    Lihat Detail
                  </Link>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="bg-[#00B7C2] text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    Destinasi Jawa Tengah
                  </p>
                </div>
                <img src={foto} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-1 text-black">
                    Surabaya <i className="fa-solid fa-arrow-right"></i> Jogja
                  </p>
                  <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                    <p className="font-medium text-black">
                      <i className="fa-solid fa-plane-circle-check"></i>{" "}
                      Citilink
                    </p>
                    <p className="font-medium text-black">
                      <i className="fa-regular fa-calendar"></i> 30 Mei 2024
                    </p>
                  </div>
                  <p className="text-center text-red-600 mb-4">
                    Harga Diskon:{" "}
                    <span className="font-bold text-lg">Rp 750.000</span>
                  </p>
                  <Link className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800  focus:outline-none">
                    Lihat Detail
                  </Link>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="bg-[#00B7C2] text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    Destinasi Bali
                  </p>
                </div>
                <img src={foto2} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-1 text-black">
                    Jakarta <i className="fa-solid fa-arrow-right"></i> Bali
                  </p>
                  <div className="flex justify-center space-x-10 text-gray-700 mb-1">
                    <p className="font-medium text-black">
                      <i className="fa-solid fa-plane-circle-check"></i> Garuda
                    </p>
                    <p className="font-medium text-black">
                      <i className="fa-regular fa-calendar"></i> 30 Mei 2024
                    </p>
                  </div>
                  <p className="text-center text-red-600 mb-4">
                    Harga Diskon:{" "}
                    <span className="font-bold text-lg">Rp 1.450.000</span>
                  </p>
                  <Link className="block text-center bg-[#00B7C2] text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
