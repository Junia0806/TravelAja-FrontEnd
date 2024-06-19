import Swal from "sweetalert2";
import axios from "axios";
import { setDataBooking } from "../reducers/bookingReducers";

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
    console.log("payload :>> ", payload);
    console.log("res.data.data :>> ", res.data.data);
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
    console.error("Error:", error.response.data);
    console.error("Status Code:", error.response.status);
    console.error("There was an error!", error);
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "There was an error processing your booking. Please try again later.",
    });
  }
};
