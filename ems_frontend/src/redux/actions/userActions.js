export const ResetUserPassword = (userData) => (dispatch) => {
  api
    .post("/auth/reset-password", userData)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data,
      });
    });
};
