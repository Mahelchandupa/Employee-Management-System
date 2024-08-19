import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setAuthToken } from "../utils/Authorization";
import { LOGIN_SUCCESS } from "../utils/types";
import { refreshToken } from "../redux/actions/authActions";

const Root = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/401";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

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
            role: decoded.authorities.pop(),
          },
        });
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
