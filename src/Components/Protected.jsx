import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../Redux/actions/authActions";

function Protected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/", {
        state: {
          warning: "Login Terlebih Dahulu !",
        },
      });
      return;
    }

    dispatch(getMe(navigate, null, "/"));
  }, [navigate, dispatch, token]);

  return children;
}

export default Protected;
