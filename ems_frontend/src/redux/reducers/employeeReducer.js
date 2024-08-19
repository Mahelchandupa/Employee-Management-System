import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_EMPLOYEE_MESSAGE, CLEAR_EMPLOYEE_ERROR, GET_EMPLOYEE_DETAILS_SUCCESS, GET_EMPLOYEE_DETAILS_FAIL } from "../../utils/types";

const initialState = {
    success: false,
    error: null,
    message: null,
    employee: null,
    employees: []
};

export default function employeeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                success: true,
                message: "Employee registered to the System successfully",
                employee: payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                success: false,
                error: payload
            };
        case CLEAR_EMPLOYEE_MESSAGE:
            return {
                ...state,
                success: false,
                error: null,
                message: null
            };
        case CLEAR_EMPLOYEE_ERROR:
            return {
                ...state,
                success: false,
                error: null
            };  
        case GET_EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                employee: payload
            };
        case GET_EMPLOYEE_DETAILS_FAIL:
            return {
                ...state,
                error: payload
            };          
        default:
            return state;
    }
}