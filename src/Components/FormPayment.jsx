import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proceedToPayment } from "../Redux/actions/bookingActions";

const PaymentCard = () => {
  const dispatch = useDispatch();
  const dataBooking = useSelector((state) => state.booking?.dataBooking);
  const data_flight = useSelector((state) => state.flights.data);

  useEffect(() => {
    dispatch(proceedToPayment);
  }, [dispatch]);

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("id-ID", options);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="mx-0 p-1 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="mx-4 bg-white shadow-lg rounded-lg overflow-hidden md:mx-8">
        <div className="bg-gray-400 text-white py-2 px-4 rounded-t-lg">
          <p className="text-center text-lg">Detail Pesanan</p>
        </div>
        <div className="p-4 space-y-4 md:p-8 md:space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Booking Code
            </h2>
            <p className="text-xl font-bold text-[#00B7C2]">
              {dataBooking?.booking_code}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Keberangkatan
              </h2>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatTime(data_flight?.departure_time)}
                </span>
              </p>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatDate(data_flight?.departure_time)}
                </span>
              </p>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-plane-departure mr-2"></i>
                <span className="font-bold text-gray-900">
                  {data_flight?.destination_airport?.airport_name}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-right-long text-gray-600 text-2xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Kedatangan
              </h2>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-clock mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatTime(data_flight?.arrival_time)}
                </span>
              </p>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-calendar mr-2"></i>
                <span className="font-bold text-gray-900">
                  {formatDate(data_flight?.arrival_time)}
                </span>
              </p>
              <p className="text-gray-600 flex items-center">
                <i className="fa-solid fa-plane-arrival mr-2"></i>
                <span className="font-bold text-gray-900">
                  {data_flight?.arrival_airport?.airport_name}
                </span>
              </p>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center space-x-4">
            <img
              src={data_flight?.airlines?.url_logo}
              alt="Logo Maskapai"
              className="w-12 h-12"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Maskapai</h2>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">
                  {data_flight?.airlines?.airline_name}
                </span>{" "}
                - {data_flight?.seatclass?.seat_class_type}
              </p>
              <p className="text-gray-600">
                Kode Penerbangan:{" "}
                <span className="font-bold text-gray-900">
                  {data_flight?.flight_id}
                </span>
              </p>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Informasi</h2>
            <p className="text-gray-600">
              <i className="fa-solid fa-suitcase mr-2"></i>Kabin:{" "}
              <span className="font-bold text-gray-900">
                {data_flight?.airlines?.cabin_baggage}
              </span>
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-box mr-2"></i>Bagasi:{" "}
              <span className="font-bold text-gray-900">
                {data_flight?.airlines?.baggage}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-4 bg-white shadow-lg rounded-lg md:mx-8">
    <div className="bg-gray-500 text-white py-2 rounded-t-lg">
      <p className="text-center text-lg font-bold">
        Pilih Metode Pembayaran
      </p>
    </div>
    <div className="p-0">
      <iframe
        src={dataBooking?.snap_redirect_url}
        title="Midtrans Payment"
        className=""
        style={{
          height: '600px',
          width: '100%',
          maxWidth: '100%',
          minHeight: '300px',
          margin: '0 auto'
        }}
      ></iframe>
    </div>
  </div>
    </div>
  );
};

export default PaymentCard;
