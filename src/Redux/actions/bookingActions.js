/* eslint-disable no-empty */
import Swal from "sweetalert2";
import axios from "axios";
import { setDataBooking, setDataHistory } from "../reducers/bookingReducers";

export const proceedToPayment = (payload, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://expressjs-develop.up.railway.app/api/v1/booking/process",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setDataBooking(res.data.data));
    await Swal.fire({
      icon: "success",
      title: "Booking Successful!",
      text: res.data.message,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/bayar/${res?.data?.data?.flight_id}`;
      }
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "There was an error processing your booking. Please try again later.",
    });
  }
};

export const fetchBookingHistory = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const res = await axios.get(
      `https://expressjs-develop.up.railway.app/api/v1/booking/history`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setDataHistory(res.data.data));
  } catch (error) {
    console.error("Error fetching booking history:", error);
  }
};

export const fetchDetailBooking =
  (bookingCode) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const res = await axios.get(
        `https://expressjs-develop.up.railway.app/api/v1/booking/id/${bookingCode}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setDataHistory(res.data.data));
    } catch (error) {
      console.error("Error fetching detail booking history:", error);
    }
  };
