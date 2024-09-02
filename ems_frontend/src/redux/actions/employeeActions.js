import api from "../../utils/api";
import { CLEAR_EMPLOYEE_ERROR, CLEAR_EMPLOYEE_MESSAGE, DELETE_EMPLOYEE_FAIL, DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_UPDATE_FAIL, EMPLOYEE_UPDATE_SUCCESS, GET_EMPLOYEE_DETAILS_FAIL, GET_EMPLOYEE_DETAILS_SUCCESS, GET_EMPLOYEES_FAIL, GET_EMPLOYEES_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../../utils/types";

export const registerEmployee = (employee) => async (dispatch) => {

    api.post('/employees', employee, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
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

export const getEmployeeById = (id) => async (dispatch) => {

    api
     .get(`/employees/${id}`, {
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

export const getAllEmployees = () => async (dispatch) => {

    api
     .get(`/employees`, {
         headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
         }
     })
     .then((res) => {
         dispatch({
             type: GET_EMPLOYEES_SUCCESS,
             payload: res.data
         });
     })
     .catch((err) => {
         const errorMessage = err.response?.data?.message || "An error occurred";
         dispatch({
             type: GET_EMPLOYEES_FAIL,
             payload: errorMessage
         });
     });
}

export const getAllEmployeesByRole = (role, searchQuery = "", department = "") => async (dispatch) => {
    const params = new URLSearchParams();

    if (searchQuery) {
        params.append("firstName", searchQuery);
        params.append("lastName", searchQuery); 
    }

    if (department) {
        params.append("department", department);
    }

    api
        .get(`/employees/role/${role}?${params.toString()}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_EMPLOYEES_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            const errorMessage = err.response?.data?.message || "An error occurred";
            dispatch({
                type: GET_EMPLOYEES_FAIL,
                payload: errorMessage,
            });
        });
};

export const clearEmployeeMessage = () => ({
    type: CLEAR_EMPLOYEE_MESSAGE,
});

export const clearEmployeeError = () => ({
    type: CLEAR_EMPLOYEE_ERROR,
});

export const deleteEmployee = (id) => async (dispatch) => {

    api
     .delete(`/employees/${id}`, {
         headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
         }
     })
     .then((res) => {
         dispatch({
             type: DELETE_EMPLOYEE_SUCCESS,
             payload: res.data
         });
     })
     .catch((err) => {
         const errorMessage = err.response?.data?.message || "An error occurred";
         dispatch({
             type: DELETE_EMPLOYEE_FAIL,
             payload: errorMessage
         });
     });
}

export const updateEmployee = (employee, id) => async (dispatch) => {

    api.put(`/employees/${id}`, employee, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    .then((res) => {
        dispatch({
            type: EMPLOYEE_UPDATE_SUCCESS,
            payload: res.data
        });
    }).catch((err) => {
        const errorMessage = err.response?.data?.message || "An error occurred";
        dispatch({
            type: EMPLOYEE_UPDATE_FAIL,
            payload: errorMessage
        });
    });      
};