import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterNewHRValidation } from "../validation/Validation";
import {
  clearEmployeeMessage,
  registerEmployee,
} from "../redux/actions/employeeActions";
import useValidation from "../hooks/useValidation";
import { ROLES } from "../utils/permission";

const HrRegistration = () => {
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
  const { role, authorities } = authUser;
  const { message, success } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    role: "MANAGER",
    employmentStatus: "",
    workHours: "",
    salary: "",
    jobTitle: "",
    department: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useValidation(initialState, RegisterNewHRValidation);

  const isFormValid =
    errors &&
    values &&
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    dispatch(registerEmployee(values)).then(
      (success) => success && setValues(initialState)
    )
    // if (success) {
    //   setValues(initialState);
    // }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearEmployeeMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div
      className={` h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900`}
    >
      <div
        className={`bg-white min-h-[700px] dark:bg-gray-800 rounded-lg shadow-lg py-4 px-6 w-full max-w-6xl`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Register New HR Manager
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8">
            <h1 className=" font-bold text-xl pb-4 text-purple-600 dark:text-purple-500">
              Personl Details
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="First Name"
                  name="firstName"
                  id="firstName"
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Last Name"
                  name="lastName"
                  id="lastName"
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className=" mt-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="User Email"
                  name="email"
                  id="email"
                />
                {touched.email && errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Role <span className=" text-red-400">*</span>
                </label>
                <select
                  value={values.role}
                  onChange={handleChange}
                  className="w-full  py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
                  onBlur={handleBlur}
                  name="role"
                  id="role"
                  disabled={values.role === "MANAGER"}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="MANAGER">HR</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
                {touched.role && errors.role && (
                  <p className="text-red-400 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          </div>

             {/* Job Information */}
             <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8 mt-6">
              <h1 className=" font-bold text-xl pb-4 text-purple-600 dark:text-purple-500">
                Job Information
              </h1>
              <div className=" mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Job Title <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.jobTitle}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Job Title"
                    onBlur={handleBlur}
                    name="jobTitle"
                    id="jobTitle"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.jobTitle && errors.jobTitle && (
                    <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>
                  )}
                </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">           
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Department <span className=" text-red-400">*</span>
                  </label>
                  <select
                    type="text"
                    value={values.department}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border text-gray-400 dark:text-gray-300 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                    onBlur={handleBlur}
                    name="department"
                    id="department"
                    disabled={role === ROLES.ROLE_MANAGER}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Security Deparment">Security Deparment</option>
                  </select>
                  {touched.department && errors.department && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>
  
                <div className="">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Employment Status <span className=" text-red-400">*</span>
                  </label>
                  <select
                    value={values.employmentStatus}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border text-gray-400 dark:text-gray-300 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                    onBlur={handleBlur}
                    name="employmentStatus"
                    id="employmentStatus"
                    disabled={role === ROLES.ROLE_MANAGER}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="Full time">Full Time</option>
                    <option value="Part time">Part Time</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Casual">Casual</option>
                  </select>
                  {touched.employmentStatus && errors.employmentStatus && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.employmentStatus}
                    </p>
                  )}
                </div>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Working Hours
                    <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={values.workHours}
                    max={12}
                    min={5}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Working Hours"
                    onBlur={handleBlur}
                    name="workHours"
                    id="workHours"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.workHours && errors.workHours && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.workHours}
                    </p>
                  )}
                </div>
  
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Salary <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.salary}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Personl salary"
                    onBlur={handleBlur}
                    name="salary"
                    id="salary"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.salary && errors.salary && (
                    <p className="text-red-400 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
              </div>
            </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              onClick={() => console.log("Cancel")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                isFormValid
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white py-2 px-4 rounded-md shadow-sm`}
              disabled={!isFormValid}
            >
              Save
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-4 p-4 text-white ${
              success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default HrRegistration;
