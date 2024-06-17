/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const seatOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
  const [passengers, setPassengers] = useState([{ id: 1 }]);
  const [passengerData, setPassengerData] = useState(null);

  useEffect(() => {
    async function postData() {
      try {
        // Buat objek data penumpang dari state passengers
        const passengerData = passengers.map((passenger) => ({
          fullname: passenger.fullname || "",
          born_date: passenger.born_date || "",
          identity_number: passenger.identity_number || "",
          // Anda perlu menambahkan data lain yang dibutuhkan untuk permintaan POST
        }));

        // Kirim data penumpang ke server menggunakan axios.post()
        const response = await axios.post("https://expressjs-develop.up.railway.app/api/v1/passenger", passengerData);

        // Periksa apakah status respons adalah true
        if (response.data && response.data.status === true) {
          // Jika status true, set pesan respons
          setResponseMessage(response.data.message);
        } else {
          // Jika status false atau tidak ada status, tangani kesalahan atau respon tidak valid
          console.error("Invalid response or status false:", response.data);
        }
      } catch (error) {
        // Tangani kesalahan saat melakukan permintaan
        console.error("Error:", error);
      }
    }

    // Panggil fungsi postData
    postData();
  }, [passengers]); // Gunakan state passengers sebagai dependensi untuk menjalankan useEffect saat ada perubahan pada state tersebut

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
                  <button onClick={() => removePassenger(passenger.id)} className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 focus:outline-none">
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
                    value={passenger.fullname || ""}
                    onChange={(e) => handleInputChange(e, index, "fullName")}
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
                    value={passenger.born_date || ""}
                    onChange={(e) => handleInputChange(e, index, "birthDate")}
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
                    value={passenger?.identity_number || ""}
                    onChange={(e) => handleInputChange(e, index, "idNumber")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <Link onClick={addPassenger} className="block text-center bg-[#00B7C2] text-white font-bold text-l py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none">
          Tambah Penumpang <i className="fa-solid fa-user-plus"></i>
        </Link>
      </div>
    </div>
  );
};

export default BookingForm;
