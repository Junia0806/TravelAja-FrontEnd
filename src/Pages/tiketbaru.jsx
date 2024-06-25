/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";

const BoardingPass = () => {
  const printRefs = useRef([]);
  const [boardingPassData, setBoardingPassData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im11a2ExMkBuYXZhbGNhZGV0cy5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTA0MDk3NywiZXhwIjoxNzE5MTI3Mzc3fQ.DPg6TtwKf1LzsoZcz3lOjlvZy75zuLYKsHNF94dVKq0"; // Ganti dengan token otorisasi Anda
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          "https://expressjs-develop.up.railway.app/api/v1/ticket/TVLAJA-000028",
          config
        );
        if (response.status === 200) {
          setBoardingPassData(response.data.data);
        } else {
          console.error("Failed to fetch boarding pass data");
        }
      } catch (error) {
        console.error("Error fetching boarding pass data:", error);
      }
    };

    fetchData();
  }, []);

  const generatePDF = async (passengerIndex) => {
    if (!boardingPassData || boardingPassData.passengers.length === 0) {
      return;
    }

    const passenger = boardingPassData.passengers[passengerIndex];
    const element = printRefs.current[passengerIndex];
    const { width, height } = element.getBoundingClientRect();
    const pdf = new jsPDF({
      orientation: width > height ? "landscape" : "portrait",
      unit: "px",
      format: [width, height],
    });
    const canvas = await html2canvas(element, { scale: 2, width, height });
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`boarding_pass_${passenger.ticket.ticket_id}.pdf`);
  };

  return (
    <div className="container max-w-3xl mx-auto my-10 p-4">
      {boardingPassData ? (
        <>
          {boardingPassData.passengers.map((passenger, index) => (
            <div
              key={index}
              ref={(el) => (printRefs.current[index] = el)}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 mb-6"
            >
              {/* Card 1: Logo and Basic Info */}
              <div className="flex">
                <div className="w-1/3 bg-gradient-to-r from-[#00B7C2] to-[#0097A7] text-white p-6">
                  <h1 className="text-lg font-semibold mb-4 flex items-center">
                    <img
                      src={boardingPassData?.flight?.airlines?.url_logo}
                      alt="Garuda Asia"
                      className="w-8 h-8 mr-2"
                    />
                    {boardingPassData?.flight?.airlines?.airline_name}
                  </h1>
                  <div className="text-sm mb-4">
                    <p>BOARDING PASS</p>
                    <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 inline-block">
                      {boardingPassData?.flight?.seatclass?.seat_class_type}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="mb-2">
                      <strong>Penerbangan:</strong>{" "}
                      {boardingPassData?.flight_id}
                    </p>
                    <p className="mb-2">
                      <strong>Kursi:</strong>{" "}
                      {boardingPassData?.flight?.seatclass?.seat_class_id}
                    </p>
                  </div>
                </div>
                {/* Card 2: Passenger Info */}
                <div className="w-1/3 p-6 bg-gray-50">
                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      {passenger.ticket.ticket_id}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Penumpang:</strong> {passenger.fullname}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      {passenger?.identity_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      {" "}
                      {passenger?.passenger_type}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Dari:</strong>{" "}
                      {boardingPassData?.flight?.destination_airport?.city} (
                      {boardingPassData?.flight?.destination_airport?.id}){" "}
                      {
                        boardingPassData?.flight?.destination_airport
                          ?.airport_name
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ke:</strong>{" "}
                      {boardingPassData?.flight?.arrival_airport?.city} (
                      {boardingPassData?.flight?.arrival_airport?.id}){" "}
                      {boardingPassData?.flight?.arrival_airport?.airport_name}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Keberangkatan:</strong> {passenger.departure}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Kedatangan:</strong> {passenger.arrival}
                    </p>
                  </div>
                </div>

                {/* Card 3: Additional Info and QR Code */}
                <div className="w-1/3 p-6 bg-gray-50 flex flex-col justify-between border-l-2 border-dashed border-gray-400">
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Penerbangan:</strong>{" "}
                      {boardingPassData?.flight_id}
                    </p>
                    <p className="mb-2">
                      <strong>{passenger.class}</strong> {passenger.seat}
                    </p>
                    <p className="mb-2">
                      <strong>Dari:</strong>{" "}
                      {boardingPassData?.flight?.destination_airport?.city} (
                      {boardingPassData?.flight?.destination_airport?.id})
                    </p>
                    <p className="mb-2">
                      <strong>Ke:</strong>{" "}
                      {boardingPassData?.flight?.arrival_airport?.city} (
                      {boardingPassData?.flight?.arrival_airport?.id})
                    </p>
                  </div>

                  <img src={passenger?.ticket?.url_qrcode} alt="QR Code" />
                  <p className="text-xs text-gray-600 text-center">
                    <strong> {passenger.ticket.ticket_id}</strong>
                  </p>
                </div>
              </div>

              {/* Button for PDF Download for this passenger */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => generatePDF(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Download {passenger.ticket.ticket_id}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardingPass;
