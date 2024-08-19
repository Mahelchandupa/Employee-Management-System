import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetPasswordValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";
import {
  clearUserMessage,
  resetUserPassword,
} from "../redux/actions/userActions";
import usePreviousRoute from "../hooks/usePreviousRoute";

const ResetPassword = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { message, success } = useSelector((state) => state.user);

  const previousRoute = usePreviousRoute();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (previousRoute) {
      console.log("Previous route:", previousRoute.pathname);
    }
  }, [previousRoute]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearUserMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useValidation(initialState, ResetPasswordValidation);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    dispatch(resetUserPassword(values));
    if (success) {
      setValues(initialState);
    }
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
            {touched.currentPassword && errors.currentPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.currentPassword}
              </p>
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
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={values.confirmationPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Confirm Password"
              name="confirmationPassword"
              id="confirmationPassword"
            />
            {touched.confirmationPassword && errors.confirmationPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmationPassword}
              </p>
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

export default ResetPassword;
