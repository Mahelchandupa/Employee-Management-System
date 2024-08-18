import React, { useState } from "react";
import { AddNewEmpValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";
import { useSelector } from "react-redux";

const NewEmployeeForm = () => {

  const { user } = useSelector((state) => state.auth);

  console.log("user", user);

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    // password: "",
    role: "EMPLOYEE",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useValidation(initialState, AddNewEmpValidation);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    console.log("Form Submitted", values);
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white max-h-[700px] dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          New Employee
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                First Name <span className=" text-red-400">*</span>
              </label>
              <input
                type="text"
                value={values.firstname}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="First Name"
                onBlur={handleBlur}
                name="firstname"
                id="firstname"
              />
              {errors.firstname && <p className="text-red-400 text-sm mt-1">{errors.firstname}</p>}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Last Name <span className=" text-red-400">*</span>
              </label>
              <input
                type="text"
                value={values.lastname}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Last Name"
                onBlur={handleBlur}
                name="lastname"
                id="lastname"
              />
              {touched.lastname && errors.lastname && <p className="text-red-400 text-sm mt-1">{errors.lastname}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email <span className=" text-red-400">*</span>
            </label>
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Email"
              onBlur={handleBlur}
              name="email"
              id="email"
              />
              {touched.email && errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password <span className=" text-red-400">*</span>
            </label>
            <input
              type="password"
              value={values.password}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Password"
              onBlur={handleBlur}
              name="password"
              id="password"
            />
            {touched.password && errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div> */}

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Role <span className=" text-red-400">*</span>
            </label>
            <select
              value={values.role}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
              onBlur={handleBlur}
              name="role"
              id="role"
              disabled={values.role === "EMPLOYEE"}
            >
            <option value="" disabled>
                Select Role
              </option>
              <option value="HR">HR</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
            {touched.role && errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
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
              disabled={!isFormValid}
              className={` ${!isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white py-2 px-4 rounded-md shadow-sm `}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEmployeeForm;
