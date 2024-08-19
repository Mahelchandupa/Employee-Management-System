import { jwtDecode } from "jwt-decode";
import { setAuthToken } from "../../utils/Authorization";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../utils/types";
import api from "../../utils/api";
import { ROLES } from "../../utils/permission";
import { getEmployeeDetails } from "./employeeActions";

export const loginUser = (userData) => (dispatch) => {

  api
    .post("/auth/authenticate", userData)
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      setAuthToken(access_token);
      const decoded = jwtDecode(access_token);
      const authorities = decoded.authorities || [];
      const userRole = authorities.pop();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          ...decoded,
          role: userRole,
        },
      });

      // Redirect based on the server response
      if (userRole === ROLES.ROLE_EMPLOYEE) {
        dispatch(getEmployeeDetails(decoded.sub));
        // window.location.href = "http://localhost:3000/";
        console.log("Sending request to get employee details")
      }
      else {
        // window.location.href = "http://localhost:3000/";
        console.log("redirecting to home page")
      }
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage,
      });
    });
};

export const refreshToken = () => (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    api
      .post("/auth/refresh-token", { refreshToken })
      .then((res) => {
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        setAuthToken(accessToken);

        const decoded = jwtDecode(accessToken);
        const userRole = decoded.authorities.pop();

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            ...decoded,
            role: userRole,
          },
        });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  } else {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const logoutUser = () => (dispatch) => {
  api.post("/auth/logout", {},{
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setAuthToken(null);
  dispatch({ type: LOGOUT });
  window.location.href = `http://localhost:3000/login`;
};
