import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_USER_MESSAGE,
  CLEAR_USER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_EMPLOYEE_MESSAGE,
  CLEAR_EMPLOYEE_ERROR,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_FAIL,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAIL,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
} from "../../utils/types";

const initialState = {
  success: false,
  error: null,
  message: null,
  user: null,
  users: [],
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
        message: "Employee registered to the System successfully",
        // user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        success: false,
        error: payload,
      };
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        message: "Employee Details update successfully",
        user: payload,
      };
    case EMPLOYEE_UPDATE_FAIL:
      return {
        ...state,
        success: false,
        error: payload,
      };
    case CLEAR_EMPLOYEE_MESSAGE:
      return {
        ...state,
        success: false,
        error: null,
        message: null,
      };
    case CLEAR_EMPLOYEE_ERROR:
      return {
        ...state,
        success: false,
        error: null,
      };
    case GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case GET_EMPLOYEE_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        users: payload,
      };
    case GET_EMPLOYEES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        message: payload.message,
        user: payload.user,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        success: false,
        error: payload,
      };
    case CLEAR_USER_MESSAGE:
      return {
        ...state,
        success: false,
        error: null,
        message: null,
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        success: false,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
        error: null,
        message: payload.message,
      };
    case DELETE_EMPLOYEE_FAIL:
      return {
        ...state,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
}
