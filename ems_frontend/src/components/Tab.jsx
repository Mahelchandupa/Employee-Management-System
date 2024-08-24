import React, { useState } from "react";
import { FaUserPlus, FaUsersGear } from "react-icons/fa6";
import NewEmployeeForm from "./NewEmployeeForm";
import EmployeeTable from "./EmployeeTable";
import { useSelector } from "react-redux";
import { ROLES } from "../utils/permission";
import HrRegistration from "../pages/HrRegistration";
import { useNavigate } from "react-router-dom";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { authUser } = useSelector((state) => state.auth);

  const { role } = authUser;

  const navigate = useNavigate()

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

        {/* Only admin can register hr managers */}
        {role === ROLES.ROLE_ADMIN && (
          <button
            className={`${
              activeTab === 2
                ? " dark:text-purple-500 dark:border-purple-500 text-purple-600 border-purple-600"
                : "text-gray-700 border-transparent dark:hover:text-purple-500 dark:hover:border-purple-500 hover:text-purple-600 hover:border-purple-600"
            } py-2 px-4 font-semibold text-lg border-b-2 transition-colors duration-300 flex items-center`}
            onClick={() => setActiveTab(2)}
          >
            <FaUserPlus className="mr-2" />
            Register New HR Manager
          </button>
        )}

      </div>
      <div className="mt-4">
        {activeTab === 0 && <EmployeeTable />}
        {activeTab === 1 && <NewEmployeeForm />}
        {activeTab === 2 && <HrRegistration />}
      </div>
    </div>
  );
};

export default Tab;
