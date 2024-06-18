import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../Redux/actions/authActions";
import { toast } from "react-toastify";

function Protected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.warning("Login Terlebih Dahulu !");
      return navigate("/");
    }

    // get user information
    dispatch(getMe(navigate, null, "/"));
  }, [navigate, dispatch, token]);

  return children;
}

export default Protected;
