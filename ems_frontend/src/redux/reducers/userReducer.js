import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, CLEAR_USER_MESSAGE, CLEAR_USER_ERROR } from "../../utils/types";

const initialState = {
    success: false,
    error: null,
    message: null,
    user: null,
    users: []
};

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                success: true,
                message: payload.message,
                user: payload.user
            };
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                success: false,
                error: payload
            };
        case CLEAR_USER_MESSAGE:
            return {
                ...state,
                success: false,
                error: null,
                message: null
            };   
        case CLEAR_USER_ERROR:
            return {
                ...state,
                success: false,
                error: null
            };     
        default:
            return state;
    }
}
