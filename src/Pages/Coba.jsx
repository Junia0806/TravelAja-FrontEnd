/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [promotions, setPromotions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`https://expressjs-develop.up.railway.app/api/v1/promotion?page=${page}&limit=${limit}`);
        console.log('API Response:', response.data);  
        if (response.data && Array.isArray(response.data.data)) {
          setPromotions(response.data.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setPromotions([]);
      }
    };

    fetchPromotions();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); // Mengurangi page jika tidak di halaman pertama
    }
  };

  const handleNext = () => {
    setPage(page + 1); // Selalu menambah page saat tombol Next ditekan
  };

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold mb-4">Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.length > 0 ? promotions.map((promotion) => (
          <div key={promotion.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{promotion.flight_id}</h2>
            <p>{promotion?.airlines?.airline_name}</p>
          </div>
        )) : null /* Tidak ada pesan atau elemen tambahan */ }
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={handleNext}
          disabled={promotions.length === 0 || promotions.length < limit} // Nonaktifkan tombol jika tidak ada promotions atau jika jumlah promotions kurang dari limit
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
