import api from "../../utils/api";
import { CLEAR_EMPLOYEE_ERROR, CLEAR_EMPLOYEE_MESSAGE, GET_EMPLOYEE_DETAILS_FAIL, GET_EMPLOYEE_DETAILS_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../../utils/types";

export const registerEmployee = (employee) => async (dispatch) => {

    api.post('/employees', employee)
    .then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch((err) => {
        const errorMessage = err.response?.data?.message || "An error occurred";
        dispatch({
            type: REGISTER_FAIL,
            payload: errorMessage
        });
    });      
};

export const getEmployeeDetails = (email) => async (dispatch) => {

   api
    .get(`/employees/email/${email}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    .then((res) => {
        dispatch({
            type: GET_EMPLOYEE_DETAILS_SUCCESS,
            payload: res.data
        });
    })
    .catch((err) => {
        const errorMessage = err.response?.data?.message || "An error occurred";
        dispatch({
            type: GET_EMPLOYEE_DETAILS_FAIL,
            payload: errorMessage
        });
    });
}

export const clearEmployeeMessage = () => ({
    type: CLEAR_EMPLOYEE_MESSAGE,
});

export const clearEmployeeError = () => ({
    type: CLEAR_EMPLOYEE_ERROR,
});