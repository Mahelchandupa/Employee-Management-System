import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../utils/types';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}
