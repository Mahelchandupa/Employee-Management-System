import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconNavArrowBack from "../assets/icon-navigation-arrow-back-ios-24-px.svg";
import workingEmployee from "../assets/emp-img-remove.png";
import useValidation from "../hooks/useValidation";
import { LoginValidation } from "../validation/Validation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { button } from "@material-tailwind/react";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const initialState = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useValidation(initialState, LoginValidation);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    console.log("Form Submitted", values);
    dispatch(loginUser(values, navigate));
  };

  const [isRememberMeChecked, setRememberMeChecked] = useState(false);

  const toggleRememberMe = () => {
    setRememberMeChecked(!isRememberMeChecked);
  };

  return (
    <div className="flex flex-col-reverse overflow-auto md:flex-row h-screen md:overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-slate-900 flex flex-col items-center justify-center p-8">
        {/* <div className="flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 73 36">
            <text x="0" y="24" fill="white" className="text-3xl font-bold">Logo</text>
          </svg>
        </div> */}
        <div className="flex items-center justify-center px-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="font-pop text-white font-bold">IT</span>
          </div>
          <span className="ml-2 font-pop text-blue-700 font-bold text-lg tracking-wide">
            SOLUTION
          </span>
        </div>
        <img
          src={workingEmployee}
          alt="Working Employee"
          className="w-3/4 mt-8"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <Link
          to="/"
          className="flex items-center self-start text-gray-600 mb-8"
        >
          <img src={iconNavArrowBack} alt="Back" className="w-4 h-4 mr-2" />
          <span className="text-lg font-semibold">Back</span>
        </Link>
        <div className="max-w-md w-full">
          <form onSubmit={handleSubmit(submitForm)}>
            <h1 className="text-3xl font-bold mb-4">Account Login</h1>
            <p className="text-gray-600 mb-8">
              If you are already a member you can login with your email address
              and password.
            </p>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showPassword ? (
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <FaRegEye
                      size={18}
                      className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                    />
                  </button>
                ) : (
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <FaRegEyeSlash
                      size={18}
                      className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                    />
                  </button>
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isRememberMeChecked}
              onChange={toggleRememberMe}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-gray-600 font-medium"
            >
              Remember me
            </label>
          </div> */}
            <button
              className={`w-full ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }  font-medium p-4 rounded-md transition`}
            >
              Login
            </button>
            {/* <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
