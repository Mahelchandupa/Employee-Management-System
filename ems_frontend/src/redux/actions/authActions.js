import { jwtDecode } from "jwt-decode";
import { setAuthToken } from "../../utils/Authorization";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, PROMPT_2FA_VERIFICATION } from "../../utils/types";
import api from "../../utils/api";
import { ROLES } from "../../utils/permission";
import { getEmployeeDetails } from "./employeeActions";

export const loginUser = (userData) => (dispatch) => {

  api
    .post("/auth/authenticate", userData)
    .then((res) => {
      const { mfaEnabled } = res.data;

      if (mfaEnabled) {
        console.log('userdata',userData)
        dispatch({
          type: PROMPT_2FA_VERIFICATION,
          payload: { email: userData.email }
        });
        setTimeout(() => {  
           window.location.href = `http://localhost:3000/two-fa-varification?email=${userData.email}`;
        }, 1000);
      } else {
        dispatch(handleSuccessfulLogin(res.data));
      }
    })
    .catch((err) => {
      dispatch(handleLoginFailure(err));
    });
};

export const refreshToken = () => (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    api
      .post("/auth/refresh-token", { refreshToken })
      .then((res) => {
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        setAuthToken(accessToken);

        const decoded = jwtDecode(accessToken);
        const userRole = decoded.authorities.pop();

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            ...decoded,
            role: userRole,
          },
        });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  } else {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const logoutUser = () => (dispatch) => {
  api.post("/auth/logout", {},{
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setAuthToken(null);
  dispatch({ type: LOGOUT });
  window.location.href = `http://localhost:3000/login`;
};


export const enable2FA = async (email) => {
  try {
    const res = await api.post(`/auth/enable-2fa`, null, {
      params: { email },
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    console.log(`secretImageUri: ${res.data.secretImageUri}`);
    return res.data;
  } catch (err) {
    throw new Error("Error enabling 2FA. Please try again.");
  }
};


export const verify2FA = (email, code) => (dispatch) => {
  console.log(`call verify fun`, email, code)
  api
    .post("/auth/verify", { email, code })
    .then((res) => {
      dispatch(handleSuccessfulLogin(res.data));
    })
    .catch((err) => {
      dispatch(handle2FAVerificationFailure(err));
    });
};


export const handleSuccessfulLogin = (data) => (dispatch) => {

  console.log('call this')
  const { accessToken, refreshToken, mfaEnabled } = data;

  // Store tokens in local storage
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // Set Authorization header for subsequent requests
  setAuthToken(accessToken);

  // Decode the JWT to get user details
  const decoded = jwtDecode(accessToken);
  const authorities = decoded.authorities || [];
  const userRole = authorities.pop();

  // Dispatch LOGIN_SUCCESS to update the Redux store
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      ...decoded,
      role: userRole,
      mfaEnabled,
    },
  });

  // Additional actions based on user role
  if (userRole === ROLES.ROLE_EMPLOYEE) {
    dispatch(getEmployeeDetails(decoded.sub));
  }

  // Optional: Redirect user to the appropriate page
  // window.location.href = "/";
};

export const handleLoginFailure = (error) => (dispatch) => {
  let errorMessage = "An error occurred";

  if (error.response && error.response.data) {
    errorMessage = error.response.data.message || errorMessage;
  }

  dispatch({
    type: LOGIN_FAIL,
    payload: errorMessage,
  });
};

export const handle2FAVerificationFailure = (error) => (dispatch) => {
  let errorMessage = "Two-Factor Authentication failed. Please try again.";

  if (error.response && error.response.data) {
    errorMessage = error.response.data.message || errorMessage;
  }

  dispatch({
    type: LOGIN_FAIL,
    payload: errorMessage,
  });
};

// export const loginUser = (userData) => (dispatch) => {
//   api
//     .post("/auth/authenticate", userData)
//     .then((res) => {
//       const { accessToken, refreshToken, mfaEnabled } = res.data;
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       setAuthToken(accessToken);
//       const decoded = jwtDecode(accessToken);
//       const authorities = decoded.authorities || [];
//       const userRole = authorities.pop();
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: {
//           ...decoded,
//           role: userRole,
//           mfaEnabled,
//         },
//       });

//       // Redirect based on the server response
//       if (userRole === ROLES.ROLE_EMPLOYEE) {
//         dispatch(getEmployeeDetails(decoded.sub));
//         // window.location.href = "http://localhost:3000/";
//         console.log("Sending request to get employee details")
//       }
//       else {
//         // window.location.href = "http://localhost:3000/";
//         console.log("redirecting to home page")
//       }
//     })
//     .catch((err) => {
//       const errorMessage = err.response?.data?.message || "An error occurred";
//       dispatch({
//         type: LOGIN_FAIL,
//         payload: errorMessage,
//       });
//     });
// };