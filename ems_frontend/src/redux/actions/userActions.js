import api from "../../utils/api";
import { CLEAR_USER_ERROR, CLEAR_USER_MESSAGE, GET_USER_PROFILE, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, USER_ERROR } from "../../utils/types";

export const resetUserPassword = (passwordData) => (dispatch) => {

  api
    .patch("/users/reset-password", passwordData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: errorMessage,
      });
    });
};

export const resetUserPasswordFirstAttempt = (passwordData, navigate) => (dispatch) => {

  api
    .patch("/users/reset-password", passwordData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });

      setTimeout(() => {
        navigate('/')
      }, 4000)
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: errorMessage,
      });
    });

};

export const getUserProfile = () => (dispatch) => {
  api
    .get("/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: USER_ERROR,
        payload: errorMessage,
      });
    });
}

export const clearUserMessage = () => ({
  type: CLEAR_USER_MESSAGE,
});

export const clearUserError = () => ({
  type: CLEAR_USER_ERROR,
});