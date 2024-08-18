import React, { useState } from 'react';
import { FaBars, FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = ({toggleSidebar}) => {

  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
     dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 w-full z-30 lg:w-auto lg:px-6 z-20">
      <div className="flex items-center">
        <button className="mr-4 lg:hidden" onClick={toggleSidebar}>
          <FaBars className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme}>
          {theme === 'light' ? (
            <FaMoon className="text-gray-600 h-6 w-6 dark:text-gray-300" />
          ) : (
            <FaSun className="text-gray-600 h-6 w-6 dark:text-gray-300" />
          )}
        </button>
        <FaUserCircle className="text-gray-600 h-6 w-6 dark:text-gray-300" />
        <button onClick={handleLogout} className=" text-sm flex items-center text-gray-800 dark:text-white border py-1 px-2 rounded-md border-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-800 dark:hover:border-slate-200 transition duration-300 ease-out hover:ease-in">
          <span className="mr-2">Logout</span>
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
