import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetPasswordValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";

const ResetPassword = () => {
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { values , errors, touched, handleChange, handleBlur, handleSubmit } =
    useValidation(initialState, ResetPasswordValidation);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    console.log("Form Submitted", values);
    dispatch(loginUser(values));
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white max-h-[700px] dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Current Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Current Password"
              name="currentPassword"
              id="currentPassword"
            />
            {errors.currentPassword && touched.currentPassword (
              <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              New Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
            />
            {errors.newPassword && touched.newPassword (
              <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
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
      </div>
    </div>
  );
};

export default ResetPassword;
