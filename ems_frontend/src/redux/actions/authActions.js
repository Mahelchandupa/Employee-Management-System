import { jwtDecode } from "jwt-decode";
import { setAuthToken } from "../../utils/Authorization";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../utils/types";
import api from "../../utils/api";

export const loginUser = (userData) => (dispatch) => {
  api
    .post("/auth/authenticate", userData)
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      const redirectUrl = res.headers["redirect-url"];
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
      if (redirectUrl) {
        window.location.href = `http://localhost:3000${redirectUrl}`;
      } 
      // else {
      //   window.location.href = "http://localhost:3000/";
      // }
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    });
};

export const refreshToken = () => (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    api
      .post("/api/auth/refresh-token", { refreshToken })
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
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setAuthToken(null);
  dispatch({ type: LOGOUT });
};
