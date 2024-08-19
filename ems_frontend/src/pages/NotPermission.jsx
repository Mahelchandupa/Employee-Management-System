import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function NotPermission() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800">
        <div className="absolute top-8 left-8">
          <Link
            to="/"
            className="flex items-center text-primary dark:text-gray-300"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            You do not have permission to access this page.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
    </div>
  );
}

export default NotPermission;
