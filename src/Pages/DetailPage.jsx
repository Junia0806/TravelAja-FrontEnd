/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchFlightDetail } from "../Redux/actions/flightAction";
import { useSpring, animated } from "react-spring";
import { FaPlaneDeparture } from "react-icons/fa6";
import { fetchSeat } from "../Redux/actions/flightAction";

const DetailPenerbangan = () => {
  const idFlight = useParams();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flights.data);

  const seatClassId = useSelector(
    (state) => state.flights.data?.seatclass?.seat_class_id
  );
  const seat = useSelector((state) => state.flights.seat);
  const availableSeatsCount =
    seat?.data?.filter((seat) => seat.status === "AVAILABLE").length || 0;
  console.log("availableSeatsCount :>> ", availableSeatsCount);

  useEffect(() => {
    dispatch(fetchSeat(seatClassId));
    dispatch(fetchFlightDetail(idFlight.id));
  }, [dispatch, seatClassId, idFlight.id]);

  if (!flight) {
    return <div>Data tidak ditemukan</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const planeAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateX(10px)" }, { transform: "translateX(0px)" }],
    from: { transform: "translateX(0px)" },
    config: { duration: 1000 },
  });

  const calculateFlightDuration = (departure, arrival) => {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
    const durationInMinutes = (arrivalTime - departureTime) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    if (minutes === 0) {
      return `${hours} jam`;
    } else {
      return `${hours} jam ${minutes} menit`;
    }
  };

  const flightDuration = calculateFlightDuration(
    flight.departure_time,
    flight.arrival_time
  );

  return (
    <div className="container max-w-5xl mx-auto my-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#00B7C2] text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg">
            Detail Penerbangan{" "}
            <strong>{flight?.destination_airport?.city}</strong>{" "}
            <i className="fa-solid fa-arrow-right"></i>{" "}
            <strong>{flight?.arrival_airport?.city}</strong>
          </p>
        </div>

        <div className="relative p-8">
          <img
            src={flight?.airlines?.url_logo}
            alt="Logo Maskapai"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          />
          <div className="p-4 md:p-8 space-y-6 relative">
            <div>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900 text-xl">
                  {flight?.airlines?.airline_name}
                </span>{" "}
                - {flight?.seatclass?.seat_class_type}
              </p>
              <p className="text-gray-600">
                Kode Penerbangan:{" "}
                <span className="font-bold text-gray-900">
                  {flight?.flight_id}
                </span>
              </p>
              <p className="text-green-600">
                Kursi Tersedia:{" "}
                <span className="font-bold text-green-900">
                 {availableSeatsCount}
                </span>
              </p>
              <div className="text-gray-600">
                {flight.price === flight.total_price ? (
                  <span className="font-bold text-gray-900">
                    Harga: Rp {flight.total_price.toLocaleString("id-ID")}
                  </span>
                ) : (
                  <>
                    <p className="text-gray-500 line-through">
                      Harga Normal: Rp {flight.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-red-600 font-bold text-lg">
                      Harga Diskon: Rp{" "}
                      {flight.total_price.toLocaleString("id-ID")}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div className="px-8 md:px-16 py-4 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatTime(flight?.departure_time)}
                </span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatDate(flight?.departure_time)}
                </span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-departure mr-2"></i>
                <span className="font-bold text-gray-900">
                  {flight?.destination_airport?.airport_name}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <animated.div
              style={planeAnimation}
              className="flex flex-col items-center"
            >
              <FaPlaneDeparture size={30} className="text-[#00B7C2]" />
              <span className="text-gray-700 dark:text-gray-400 font-semibold mt-2 flex items-center">
                {flightDuration}
              </span>
            </animated.div>
          </div>
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-gray-600">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatTime(flight?.arrival_time)}
                </span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatDate(flight?.arrival_time)}
                </span>
              </p>
              <p className="text-gray-600">
                <i className="fa-solid fa-plane-arrival mr-2"></i>
                <span className="font-bold text-gray-900">
                  {flight?.arrival_airport?.airport_name}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 ">
          <hr className="border-gray-300" />
          <div className="p-4 md:p-8 ">
            <h2 className="text-lg font-semibold text-gray-700">Informasi</h2>
            <p className="text-gray-600">
              <i className="fa-solid fa-suitcase mr-2"></i>Bagasi:{" "}
              <span className="font-bold text-gray-900">
                {flight?.airlines?.baggage}
              </span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-box mr-2"></i>Kabin:{" "}
              <span className="font-bold text-gray-900">
                {flight?.airlines?.cabin_baggage}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            to={`/proces/${idFlight.id}`}
            className="flex justify-center items-center w-1/3 text-center bg-gray-800 hover:bg-gray-900 text-white font-bold text-l py-2 px-4 rounded-md focus:outline-none transition shadow-lg"
          >
            Pesan Penerbangan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPenerbangan;
