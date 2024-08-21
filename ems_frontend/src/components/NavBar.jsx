import React, { useState } from "react";
import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import { ROLES } from "../utils/permission";
import EmployeeAvatar from '../assets/employee-avatar-ico.jpg';

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { authUser } = useSelector(state => state.auth);
  const { role } = authUser != null && authUser;
  const { user } = useSelector(state => state.user);

  const getNavTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/manage-employee") return "Manage Employees";
    if (location.pathname === "/register-employee") return "Register Employee";
    if (location.pathname === "/update-employee" ) {
      if (role === ROLES.ROLE_MANAGER) return "Update Employee";
      return "Update Profile";
    }
    if (location.pathname === "/reset-password") return "Reset Password";
  
    return "Dashboard";
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleCloseProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 w-full z-30 lg:w-auto lg:px-6 z-20">
      <div className="flex items-center">
        <button className="mr-4 lg:hidden" onClick={toggleSidebar}>
          <FaBars className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          {getNavTitle()}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <FaMoon className="text-gray-600 h-6 w-6 dark:text-gray-300" />
          ) : (
            <FaSun className="text-gray-600 h-6 w-6 dark:text-gray-300" />
          )}
        </button>
        <div className="relative">
          <FaUserCircle
            className="text-gray-600 h-6 w-6 dark:text-gray-300 cursor-pointer"
            onClick={toggleProfileMenu}
          />
          {/* {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 w-48">
              <Link
                to="/update-employee"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                onClick={handleCloseProfileMenu}
              >
                Update Profile
              </Link>
              <Link
                to="/reset-password"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                onClick={handleCloseProfileMenu}
              >
                Reset Password
              </Link>
            </div>
          )} */}
           {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 border-t border-blue-500 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-800">
              <div className="flex flex-col items-center p-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary dark:border-purple-700">
                  <img
                    src={EmployeeAvatar}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                  {/* <div className="absolute bottom-0 right-0 p-1 bg-primary dark:bg-purple-700 rounded-full text-white">
                    <FaUserCircle className="w-5 h-5" />
                  </div> */}
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white capitalize">
                  {user?.firstName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.jobTitle}
                </p>
                <p className="mt-1 text-xs text-gray-700 bg-yellow-200 px-2 dark:bg-yellow-100">
                  {user?.email}
                </p>
                <Link
                  to="/user-profile"
                  className="mt-4 px-4 py-2 w-full text-center text-sm rounded-md text-white bg-primary dark:bg-purple-700 hover:bg-primary-dark dark:hover:bg-purple-900 transition duration-300"
                  onClick={handleCloseProfileMenu}
                >
                  View Profile
                </Link>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className=" text-sm flex items-center text-gray-800 dark:text-white border py-1 px-2 rounded-md border-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-800 dark:hover:border-slate-200 transition duration-300 ease-out hover:ease-in"
        >
          <span className="mr-2">Logout</span>
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
