import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setAuthToken } from "../utils/Authorization";
import { LOGIN_SUCCESS, LOGOUT } from "../utils/types";
import { refreshToken } from "../redux/actions/authActions";
import { getEmployeeDetails } from "../redux/actions/employeeActions";

const Root = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/401" || location.pathname === '/two-fa-varification' || location.pathname === '/first-attm-reset-password';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Detect page refresh and clear tokens
    const handleBeforeUnload = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch({ type: LOGOUT }); 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const authorities = decoded.authorities || [];
      const userRole = authorities.pop();

      if (decoded.exp < currentTime) {
        // Token has expired, attempt to refresh
        dispatch(refreshToken());
      } else {
        // Token is valid, set user state
        setAuthToken(token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            ...decoded,
            role: userRole,
          },
        });

        if (userRole === "ROLE_EMPLOYEE") {
          dispatch(getEmployeeDetails(decoded.sub));
          console.log("Sending request to get employee details");
        }
      }
    }
  }, [dispatch]);

  return (
    <>
      <div
        className={`${
          isLoginPage ? "" : "flex h-screen bg-gray-100 dark:bg-gray-900"
        }`}
      >
        {!isLoginPage && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
        )}
        <div
          className={`${
            isLoginPage ? "" : "flex-1 flex flex-col overflow-hidden"
          }`}
        >
          {!isLoginPage && <Navbar toggleSidebar={toggleSidebar} />}
          <main className={`${isLoginPage ? "" : "flex-1 p-6 overflow-auto "}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Root;
