/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import foto from "../assets/destinasi/destinasi.jpg";
import foto2 from "../assets/destinasi/bali.webp";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import FlightPromo from "./HomeCoba";

const Home = () => {
  const [formData, setFormData] = useState({
    // departureAirport: "", //bentuk string
    departureAirport: null, //bentuk object
    arrivalAirport: "",
    departureDate: "",
    passengers: 1,
    seatClass: "Economy",
  });
  // console.log("form data ", formData);

  const [searchResults, setSearchResults] = useState([]);
  const [openModalAsal, setOpenModalAsal] = useState(false);
  const [openModalTujuan, setOpenModalTujuan] = useState(false);
  const [listbandara, setlistBandara] = useState([]);
  const [bandaraAsal, setBandaraAsal] = useState("");
  const [bandaraTujuan, setBandaraTujuan] = useState("");
  const navigate = useNavigate();

  const hasilPencarian = () => {
    navigate("/pencarian", {
      state: {
        formData: formData,
      },
    });
  };

  //use effect untuk bandara
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://expressjs-develop.up.railway.app/api/v1/airport`);
        setlistBandara(response.data.data);
        console.log("response.data :>> ", response.data);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, []);

  // console.log("bandaraAsal", bandaraAsal);
  const items = listbandara.map((e) => ({ ...e, name: e.airport_name }));

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  //data yang dipilih user ambil disini.
  const handleOnSelectAsal = (item) => {
    console.log("item", item);
    setBandaraAsal(item);
    //string
    //setFormData({ ...formData, departureAirport: item?.name });

    //object
    setFormData({ ...formData, departureAirport: item });

    setOpenModalAsal(false);
  };

  const handleOnSelectTujuan = (item) => {
    console.log(item);
    setBandaraTujuan(item);
    setFormData({ ...formData, arrivalAirport: item });
    setOpenModalTujuan(false);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span>
        <span style={{ display: "block", textAlign: "left" }}>name: {item.name}</span>
      </>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://expressjs-develop.up.railway.app/api/v1/search?query=${formData.departureAirport?.name}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    console.log(formData);
  };

  //Validasi untuk button cari penerbangan.
  const handleSearch = () => {
    const { departureAirport, arrivalAirport, departureDate, seatClass } = formData;
    if (!departureAirport || !arrivalAirport || !departureDate || !seatClass) {
      alert("Silakan Lengkapi Semua Data Sebelum Melakukan Pencarian.");
      return;
    }
    if (departureAirport.id === arrivalAirport.id) {
      alert("Bandara Asal dan Bandara Tujuan Harus Berbeda.");
      return;
    }
    hasilPencarian();
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-landing">
        <div className="max-w-5xl w-full mx-auto mt-5 p-8 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-center flex-grow text-white">
              Temukan Penerbangan Terbaikmu <i className="fa-solid fa-plane-up"></i>
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="mb-4">
              <label htmlFor="departureAirport" className="block text-white font-semibold mb-2">
                Asal <i className="fa-solid fa-plane-departure"></i>
              </label>
              <input
                onClick={() => setOpenModalAsal(true)}
                type="text"
                id="departureAirport"
                name="departureAirport"
                // value={bandaraAsal?.name}
                //string
                // value={formData.departureAirport}

                //object
                value={formData.departureAirport?.name}
                onChange={handleChange}
                placeholder="Cari Bandara Keberangkatan"
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="arrivalAirport" className="block text-white font-semibold mb-2">
                Tujuan <i className="fa-solid fa-plane-arrival"></i>
              </label>
              <input
                onClick={() => setOpenModalTujuan(true)}
                type="text"
                id="arrivalAirport"
                name="arrivalAirport"
                value={formData.arrivalAirport?.name}
                onChange={handleChange}
                placeholder="Cari Bandara Tujuan"
                className="w-full px-4 py-3 border border-white bg-transparent text-gray-800 placeholder-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-white font-semibold mb-2">
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
              <label htmlFor="seatClass" className="block text-white font-semibold mb-2">
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
              <button type="button" onClick={handleSearch} className="block w-full text-center bg-[#00B7C2] text-white font-bold text-xl py-2 px-2 rounded-md hover:bg-gray-800 focus:outline-none">
                Cari Penerbangan <i className="fa-solid fa-magnifying-glass ml-2"></i>
              </button>
            </div>
          </form>
        </div>

        {/* modal untuk bandara asal */}
        <Modal show={openModalAsal} onClose={() => setOpenModalAsal(false)}>
          <Modal.Header>Pencarian Bandara</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <label htmlFor="searchQuery" className="block text-gray-700 font-semibold mb-2">
                  Nama Bandara
                </label>
                <ReactSearchAutocomplete items={items} onSearch={handleOnSearch} onHover={handleOnHover} onSelect={handleOnSelectAsal} onFocus={handleOnFocus} autoFocus formatResult={formatResult} />
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/* modal untuk bandara tujuan */}
        <Modal show={openModalTujuan} onClose={() => setOpenModalTujuan(false)}>
          <Modal.Header>Pencarian Bandara</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <label htmlFor="searchQuery" className="block text-gray-700 font-semibold mb-2">
                  Nama Bandara
                </label>
                <ReactSearchAutocomplete items={items} onSearch={handleOnSearch} onHover={handleOnHover} onSelect={handleOnSelectTujuan} onFocus={handleOnFocus} autoFocus formatResult={formatResult} />
                {/* 
                <input
                  type="text"
                  id="searchQuery"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Masukkan nama bandara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
              </div>
              {/* <div className="mt-6 flex justify-end space-x-4">
                <Button type="submit">Cari</Button>
                <Button color="gray" onClick={() => setOpenModalTujuan(false)}>
                  Batal
                </Button>
              </div> */}
            </form>
            {/* <div className="mt-6">
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
            </div> */}
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {/* Section 2 */}
        <div>
         <FlightPromo/>
        </div>
      </div>
    </div>
  );
};

export default Home;
