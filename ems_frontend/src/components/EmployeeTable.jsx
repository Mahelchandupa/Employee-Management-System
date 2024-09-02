import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import EmployeeAvatar from "../assets/employee-avatar-ico.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEmployeeMessage,
  deleteEmployee,
  getAllEmployeesByRole,
} from "../redux/actions/employeeActions";
import { PERMISSIONS, ROLES } from "../utils/permission";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { users, message, success } = useSelector((state) => state.user);
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { role, authorities } = authUser || {};
  const { employees, totalRecord } = users || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    dispatch(
      getAllEmployeesByRole("EMPLOYEE", searchQuery, selectedDepartment)
    );
  }, [searchQuery, selectedDepartment, dispatch]);

  const handleEmployeeDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearEmployeeMessage());
        dispatch(getAllEmployeesByRole("EMPLOYEE"));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Total Employees
          </h2>
          <span className="ml-2 bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded-full">
            {totalRecord} users
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {message && (
            <p
              className={`text-sm py-[2px] px-[10px] text-white ${
                success ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <MdOutlineMoreVert className="text-gray-400" />
        </div>
      </div>

      <div className="mb-4 flex flex-col lg:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border-[1px] w-full rounded-md lg:grow border-purple-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="p-2 border-[1px] border-purple-200 rounded-md w-full lg:w-[400px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">All Departments</option>
          <option value="Finance">Finance</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Security Deparment">Security Deparment</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Department
              </th>
              {role === ROLES.ROLE_MANAGER &&
                authorities.includes(PERMISSIONS.EMPLOYEE_READ) && (
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </th>
                )}
              <th className="py-3 px-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {employees?.map((employee, index) => (
              <tr key={index}>
                <td className="py-4 px-6 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover mr-4"
                    src={EmployeeAvatar}
                    alt={employee?.firstName}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {employee?.firstName} {employee?.lastName}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-medium text-green-800 bg-green-200 rounded-full px-2 py-1">
                    {employee?.employmentStatus}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900 dark:text-gray-200">
                    {employee?.jobTitle}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900 dark:text-gray-200">
                    {employee?.department}
                  </p>
                </td>
                {role === ROLES.ROLE_MANAGER &&
                  authorities.includes(PERMISSIONS.EMPLOYEE_READ) && (
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900 dark:text-gray-200">
                        {employee?.email}
                      </p>
                    </td>
                  )}
                {role === ROLES.ROLE_MANAGER &&
                  authorities.includes(PERMISSIONS.EMPLOYEE_UPDATE) &&
                  authorities.includes(PERMISSIONS.EMPLOYEE_DELETE) && (
                    <td className="py-4 px-6 text-right">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() =>
                            navigate(`/update-employee/${employee?.id}`)
                          }
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() => handleEmployeeDelete(employee?.id)}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
