import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetPasswordValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";
import {
  clearUserError,
  clearUserMessage,
  resetUserPassword,
  resetUserPasswordFirstAttempt,
} from "../redux/actions/userActions";
import usePreviousRoute from "../hooks/usePreviousRoute";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPasswordFristAttempt = () => {
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
  const { message, success, error } = useSelector((state) => state.user);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const previousRoute = usePreviousRoute();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearUserError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

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
    dispatch(resetUserPasswordFirstAttempt(values, navigate));
    if (success) {
      setValues(initialState);
    }
  };

  return (
    <div
      className={` h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900`}
    >
      <div className="absolute flex items-center justify-center px-4 top-10 left-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="font-pop text-white font-bold text-xl">IT</span>
        </div>
        <span className="ml-2 font-pop text-blue-700 font-bold text-lg tracking-wide">
          SOLUTION
        </span>
      </div>
      <div className=" max-w-5xl mx-auto grid grid-cols-2 gap-4">
        <div>
          <p className=" font-bold text-[17px] mb-3 leading-8 text-red-800">
            For your security, a password reset is required during your first
            login. This step ensures that your account remains secure and that
            only you have access to your credentials. Please create a strong and
            unique password to protect your account.
          </p>
          <span className=" text-red-600 leading-8">
            {" "}
            Note: Failing to reset your password may leave your account
            vulnerable. Your initial password is temporary and must be updated
            to continue using your account.
          </span>
        </div>
        <div
          className={`bg-white max-h-[700px] dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xl`}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Current Password <span className="text-red-400">*</span>
              </label>
              <div className=" relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Current Password"
                  name="currentPassword"
                  id="currentPassword"
                />
                    {showCurrentPassword ? (
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <FaRegEye
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <FaRegEyeSlash
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              )}
              </div>
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
              <div className=" relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="New Password"
                  name="newPassword"
                  id="newPassword"
                />
                     {showNewPassword ? (
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FaRegEye
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FaRegEyeSlash
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              )}
              </div>
              {touched.newPassword && errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className=" relative">
                <input
                  type={showConfirmationPassword ? "text" : "password"}
                  value={values.confirmationPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Confirm Password"
                  name="confirmationPassword"
                  id="confirmationPassword"
                />
                           {showConfirmationPassword ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                >
                  <FaRegEye
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                >
                  <FaRegEyeSlash
                    size={18}
                    className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                  />
                </button>
              )}
              </div>
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
        </div>

        {message && (
          <div
            className={`mt-4 p-4 text-white col-span-2 ${
              success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        {error && (
          <div className={`mt-4 p-4 text-white col-span-2 ${"bg-red-500"}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordFristAttempt;
