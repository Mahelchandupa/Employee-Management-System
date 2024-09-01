import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterNewHRValidation } from "../validation/Validation";
import {
  clearEmployeeMessage,
  registerEmployee,
} from "../redux/actions/employeeActions";
import useValidation from "../hooks/useValidation";

const HrRegistration = () => {
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
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
    role: "MANAGER"
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
    dispatch(registerEmployee(values));
    if (success) {
      setValues(initialState);
    }
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
        className={`bg-white max-h-[700px] dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Register New HR Manager
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="First Name"
              name="firstName"
              id="firstName"
            />
            {touched.firstName && errors.firstName && (
              <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
            />
            {touched.lastName && errors.lastName && (
              <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
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
              Change
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
