import { RegisterNewEmpValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ROLES } from "../utils/permission";
import { useParams } from "react-router-dom";
import {
  clearEmployeeMessage,
  getEmployeeById,
  updateEmployee,
} from "../redux/actions/employeeActions";
import Tab from "./Tab";

const UpdateEmployeeForm = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { user, message, error, success } = useSelector((state) => state.user);

  const { role, authorities } = authUser;
  const dispatch = useDispatch();
  let { id } = useParams();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    nic: "",
    mobile: "",
    address: "",
    city: "",
    postalCode: "",
    jobTitle: "",
    department: "",
    employmentStatus: "",
    workHours: "",
    salary: "",
    bank: "",
    branch: "",
    accName: "",
    accNumber: "",
    homePhone: "",
  };

  const { values, errors, touched, handleChange, handleBlur, setValues } =
    useValidation(initialState, RegisterNewEmpValidation);

  useEffect(() => {
    if (role === ROLES.ROLE_MANAGER) {
      dispatch(getEmployeeById(id));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  console.log("user", user);

  const isFormValid = true;

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(values, id));
    if (success) {
      setValues(user);
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
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {role === ROLES.ROLE_MANAGER ? "Update Employee" : "Update Profile"}
          </h2>
          <form onSubmit={submitForm}>
            {/* Personal Details */}
            <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8">
              <h1 className=" font-bold text-xl pb-4 text-purple-600 dark:text-purple-500">
                Personl Details
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    First Name <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="First Name"
                    onBlur={handleBlur}
                    name="firstName"
                    id="firstName"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Last Name <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Last Name"
                    onBlur={handleBlur}
                    name="lastName"
                    id="lastName"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birthday <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={values.dob}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border text-gray-400 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Date of Birthday"
                    onBlur={handleBlur}
                    name="dob"
                    id="dob"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.dob && errors.dob && (
                    <p className="text-red-400 text-sm mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    National Identity Number{" "}
                    <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.nic}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Nic"
                    onBlur={handleBlur}
                    name="nic"
                    id="nic"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.nic && errors.nic && (
                    <p className="text-red-400 text-sm mt-1">{errors.nic}</p>
                  )}
                </div>

                <div className=" mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Email"
                    onBlur={handleBlur}
                    name="email"
                    id="email"
                    disabled={true}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Mobile <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.mobile}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Personl Mobile"
                    onBlur={handleBlur}
                    name="mobile"
                    id="mobile"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.mobile && errors.mobile && (
                    <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div className="">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Gender <span className=" text-red-400">*</span>
                  </label>
                  <select
                    value={values.gender}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border text-gray-400 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                    onBlur={handleBlur}
                    name="gender"
                    id="gender"
                    disabled={role === ROLES.ROLE_MANAGER}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {touched.gender && errors.gender && (
                    <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className=" mt-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Address <span className=" text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Personl Mobile"
                  onBlur={handleBlur}
                  name="address"
                  id="address"
                  disabled={role === ROLES.ROLE_MANAGER}
                />
                {touched.address && errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    City <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="City"
                    onBlur={handleBlur}
                    name="city"
                    id="city"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.postalCode}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Postal Code"
                    onBlur={handleBlur}
                    name="postalcode"
                    id="postalcode"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.postalcode && errors.postalcode && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.postalcode}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Landline Number <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.homePhone}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Landline"
                    onBlur={handleBlur}
                    name="homePhone"
                    id="homePhone"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.homePhone && errors.homePhone && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.homePhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8 mt-6">
              <div className=" flex justify-between items-center pb-4">
                <h1 className=" font-bold text-xl text-purple-600 dark:text-purple-500">
                  Job Information
                </h1>
                {role === ROLES.ROLE_EMPLOYEE && (
                  <p className=" text-[12px] text-red-400">
                    * Only HR manager can update job details{" "}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Job Title <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.jobTitle}
                    onChange={handleChange}
                    className="w-full py-1 disabled:text-gray-400 disabled:dark:text-gray-400 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Job Title"
                    onBlur={handleBlur}
                    name="jobTitle"
                    id="jobTitle"
                    disabled={role !== ROLES.ROLE_MANAGER}
                  />
                  {touched.jobTitle && errors.jobTitle && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>
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
                    disabled={role !== ROLES.ROLE_MANAGER}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Security Deparment">
                      Security Deparment
                    </option>
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
                    className="w-full py-1 px-2.5 border text-gray-400 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                    onBlur={handleBlur}
                    name="employmentStatus"
                    id="employmentStatus"
                    disabled={role !== ROLES.ROLE_MANAGER}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="CASUAL">Casual</option>
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
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 disabled:text-gray-400 disabled:dark:text-gray-400 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Working Hours"
                    onBlur={handleBlur}
                    name="workHours"
                    id="workHours"
                    disabled={role !== ROLES.ROLE_MANAGER}
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
                    className="w-full py-1 px-2.5 disabled:text-gray-400 disabled:dark:text-gray-400 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Personl salary"
                    onBlur={handleBlur}
                    name="salary"
                    id="salary"
                    disabled={role !== ROLES.ROLE_MANAGER}
                  />
                  {touched.salary && errors.salary && (
                    <p className="text-red-400 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Job Information close */}

            {/* Bank Details */}
            <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8 mt-6">
              <div className=" flex justify-between items-center pb-4">
                <h1 className=" font-bold text-xl text-purple-600 dark:text-purple-500">
                  Bank Details
                </h1>
                {role !== ROLES.ROLE_EMPLOYEE && (
                  <p className=" text-[12px] text-red-400">
                    * Only Employee can update there bank details{" "}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Bank <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.bank}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Bank"
                    onBlur={handleBlur}
                    name="bank"
                    id="bank"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.bank && errors.bank && (
                    <p className="text-red-400 text-sm mt-1">{errors.bank}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Branch <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.branch}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Branch"
                    onBlur={handleBlur}
                    name="branch"
                    id="branch"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.branch && errors.branch && (
                    <p className="text-red-400 text-sm mt-1">{errors.branch}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Acc Name
                    <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.accName}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Acc Name"
                    onBlur={handleBlur}
                    name="accName"
                    id="accName"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.accName && errors.accName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.accName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Acc Number <span className=" text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.accNumber}
                    onChange={handleChange}
                    className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Acc Number"
                    onBlur={handleBlur}
                    name="accNumber"
                    id="accNumber"
                    disabled={role === ROLES.ROLE_MANAGER}
                  />
                  {touched.accNumber && errors.accNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.accNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Bank account close */}

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
                className={` ${
                  !isFormValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white py-2 px-4 rounded-md shadow-sm `}
              >
                Update
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

export default UpdateEmployeeForm;
