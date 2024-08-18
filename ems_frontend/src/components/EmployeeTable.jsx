// src/components/EmployeeTable.js
import React from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineMoreVert } from 'react-icons/md';
import EmployeeAvatar from '../assets/employee-avatar-ico.jpg';

const EmployeeTable = () => {
  const employees = [
    { name: 'Olivia Rhye', username: '@olivia', role: 'Product Designer', email: 'olivia@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    { name: 'Phoenix Baker', username: '@phoenix', role: 'Product Designer', email: 'phoenix@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    { name: 'Lana Steiner', username: '@lana', role: 'Frontend Developer', email: 'lana@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    { name: 'Olivia Rhye', username: '@olivia', role: 'Product Designer', email: 'olivia@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    { name: 'Phoenix Baker', username: '@phoenix', role: 'Product Designer', email: 'phoenix@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    { name: 'Lana Steiner', username: '@lana', role: 'Frontend Developer', email: 'lana@untitledui.com', status: 'Active', teams: ['Design', 'Product', 'Marketing'], avatar: EmployeeAvatar },
    // Add more employees as needed
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Team members</h2>
          <span className="ml-2 bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded-full">100 users</span>
        </div>
        <MdOutlineMoreVert className="text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Role</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Email address</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Teams</th>
              <th className="py-3 px-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {employees.map((employee, index) => (
              <tr key={index}>
                <td className="py-4 px-6 flex items-center">
                  <img className="h-10 w-10 rounded-full object-cover mr-4" src={employee.avatar} alt={employee.name} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{employee.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{employee.username}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-medium text-green-800 bg-green-200 rounded-full px-2 py-1">{employee.status}</span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900 dark:text-gray-200">{employee.role}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900 dark:text-gray-200">{employee.email}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="space-x-2">
                    {employee.teams.map((team, idx) => (
                      <span key={idx} className={`text-xs font-medium rounded-full px-2 py-1 ${team === 'Design' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {team}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex space-x-2 justify-end">
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <FaRegEdit />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
