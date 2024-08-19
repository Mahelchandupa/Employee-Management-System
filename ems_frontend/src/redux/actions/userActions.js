import api from "../../utils/api";
import { CLEAR_USER_ERROR, CLEAR_USER_MESSAGE, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS } from "../../utils/types";

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

export const clearUserMessage = () => ({
  type: CLEAR_USER_MESSAGE,
});

export const clearUserError = () => ({
  type: CLEAR_USER_ERROR,
});