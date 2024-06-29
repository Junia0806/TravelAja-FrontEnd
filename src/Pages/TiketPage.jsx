import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BoardingPass = () => {
  const printRefs = useRef([]);
  const bookingCode = useParams();
  const [boardingPassData, setBoardingPassData] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://expressjs-production-6cc1.up.railway.app/api/v1/ticket/${bookingCode.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
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

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const generatePDF = async () => {
    if (!boardingPassData || boardingPassData.passengers.length === 0) {
      return;
    }

    for (let i = 0; i < printRefs.current.length; i++) {
      const element = printRefs.current[i];
      const { width, height } = element.getBoundingClientRect();
      const canvas = await html2canvas(element, { scale: 2, width, height });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });
      const logoImg = new Image();
      logoImg.src = boardingPassData?.flight?.airlines?.url_logo;
      logoImg.onload = () => {
        const logoWidth = 2 * 16;
        const logoHeight = 2 * 16;
        pdf.addImage(imgData, "PNG", 0, 160, width, height);
        pdf.addImage(logoImg, "PNG", 14, 40, logoWidth, logoHeight);
        const qrImg = new Image();
        qrImg.src = boardingPassData.passengers[i]?.ticket?.url_qrcode;
        qrImg.onload = () => {
          pdf.addImage(imgData, "PNG", 0, 60, width, height - 60);
          pdf.addImage(qrImg, "PNG", width - 200, height - 180, 130, 130);
          pdf.save(
            `boarding_pass_${boardingPassData.passengers[i]?.ticket?.ticket_id}.pdf`
          );
        };
      };
    }
  };

  return (
    <div className="container max-w-3xl mx-auto my-10 px-4 sm:px-2">
      {boardingPassData ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
            >
              Download Tiket
            </button>
          </div>
          {boardingPassData.passengers.map((passenger, index) => (
            <div
              key={index}
              ref={(el) => (printRefs.current[index] = el)}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 mb-6"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-gradient-to-r from-[#007C91] to-[#00B7C2] text-white p-6">
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
                      {passenger?.ticket?.seat?.seat_number}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-6 bg-white">
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
                      <strong>Keberangkatan:</strong>{" "}
                      {formatDate(boardingPassData?.flight?.departure_time)}{" "}
                      {formatTime(boardingPassData?.flight?.departure_time)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Kedatangan:</strong>{" "}
                      {formatDate(boardingPassData?.flight?.arrival_time)}{" "}
                      {formatTime(boardingPassData?.flight?.arrival_time)}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-6 bg-white flex flex-col justify-between border-l-2 border-dashed border-gray-400">
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
                  <img
                    src={passenger?.ticket?.url_qrcode}
                    alt="QR Code"
                    className="max-w-full h-auto"
                  />
                  <p className="text-xs text-gray-600 text-center">
                    <strong>{passenger.ticket.ticket_id}</strong>
                  </p>
                </div>
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
