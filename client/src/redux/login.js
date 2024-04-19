import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://ecommerce-brown-one.vercel.app/api/auth/login",
      user
    );
    localStorage.setItem("userData",JSON.stringify(res.data))
    dispatch(loginSuccess(res.data));

  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(loginFailure());
      console.error("Authentication failed. Invalid credentials.");
    } else {
      console.error("Login error:", error);
    }
  }
};
