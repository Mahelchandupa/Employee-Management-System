import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PROMPT_2FA_VERIFICATION,
  LOGOUT,
} from "../../utils/types";

const initialState = {
  isAuthenticated: false,
  authUser: null,
  loading: true,
  error: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authUser: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        authUser: null,
        loading: false,
        error: payload,
      };
    case PROMPT_2FA_VERIFICATION:
      return {
        ...state,
        isAuthenticated: false,
        authUser: payload,
        loading: false,
        error: null,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
