import React, { useState } from "react";
import { FaUserPlus, FaUserPen, FaUsersGear } from "react-icons/fa6";
import NewEmployeeForm from "./NewEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import EmployeeTable from "./EmployeeTable";
import { useSelector } from "react-redux";
import { ROLES } from "../utils/permission";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const { role } = user;

  return (
    <div>
      <div className="flex border-b-2 border-gray-200 dark:border-gray-600">
        <button
          className={`${
            activeTab === 0
              ? " dark:text-purple-500 dark:border-purple-500 text-purple-600 border-purple-600"
              : "text-gray-700 border-transparent dark:hover:text-purple-500 dark:hover:border-purple-500 hover:text-purple-600 hover:border-purple-600"
          } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
          onClick={() => setActiveTab(0)}
        >
          <FaUsersGear className="mr-2" />
          All employees
        </button>

        {/* Only manager can add new employee */}
        {role === ROLES.ROLE_MANAGER && (
          <button
            className={`${
              activeTab === 1
                ? " dark:text-purple-500 dark:border-purple-500 text-purple-600 border-purple-600"
                : "text-gray-700 border-transparent dark:hover:text-purple-500 dark:hover:border-purple-500 hover:text-purple-600 hover:border-purple-600"
            } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
            onClick={() => setActiveTab(1)}
          >
            <FaUserPlus className="mr-2" />
            Add new
          </button>
        )}

        <button
          className={`${
            activeTab === 2
              ? " dark:text-purple-500 dark:border-purple-500 text-purple-600 border-purple-600"
              : "text-gray-700 border-transparent dark:hover:text-purple-500 dark:hover:border-purple-500 hover:text-purple-600 hover:border-purple-600"
          } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
          onClick={() => setActiveTab(2)}
        >
          <FaUserPen className="mr-2" />
          Update
        </button>
        {/* <button
          className={`${
            activeTab === 2
              ? 'text-primary border-primary'
              : 'text-gray-700 border-transparent hover:text-primary hover:border-primary'
          } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
          onClick={() => setActiveTab(2)}
        >
          Tab 3
        </button> */}
        {/* <button
          className={`${
            activeTab === 3
              ? 'text-gray-400 border-transparent cursor-not-allowed'
              : 'text-gray-400 border-transparent'
          } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
          disabled
        >
          Disabled Tab
        </button> */}
        {/* <button
          className={`${
            activeTab === 4
              ? 'text-primary border-primary'
              : 'text-gray-700 border-transparent hover:text-primary hover:border-primary'
          } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
          onClick={() => setActiveTab(4)}
        >
          <FaStar className="mr-2" />
          Another Tab
        </button> */}
      </div>
      <div className="mt-4">
        {activeTab === 0 && <EmployeeTable />}
        {activeTab === 1 && <NewEmployeeForm />}
        {activeTab === 2 && <UpdateEmployeeForm />}
        {/* {activeTab === 4 && <AnotherTab />} */}
      </div>
    </div>
  );
};

export default Tab;
