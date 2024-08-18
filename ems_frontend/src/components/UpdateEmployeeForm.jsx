import { AddNewEmpValidation } from "../validation/Validation";
import useValidation from "../hooks/useValidation";
import { useSelector } from "react-redux";

const UpdateEmployeeForm = () => {

  const { user } = useSelector((state) => state.auth);

  const { role } = user;

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    nic: "",
    mobile: "",
    address: "",
    city: "",
    postalcode: "",
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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useValidation(initialState, AddNewEmpValidation);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value);

  const submitForm = () => {
    console.log("Form Submitted", values);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Update Employee Profile
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>

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
                  value={values.firstname}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="First Name"
                  onBlur={handleBlur}
                  name="firstname"
                  id="firstname"
                />
                {touched.firstname && errors.firstname && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Last Name <span className=" text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Last Name"
                  onBlur={handleBlur}
                  name="lastname"
                  id="lastname"
                />
                {touched.lastname && errors.lastname && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>

              <div>
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
                />
                {touched.email && errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
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
                />
                {touched.nic && errors.nic && (
                  <p className="text-red-400 text-sm mt-1">{errors.nic}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Password <span className=" text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Password"
                  onBlur={handleBlur}
                  name="password"
                  id="password"
                />
                {touched.password && errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
                />
                {touched.mobile && errors.mobile && (
                  <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
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
                />
                {touched.dob && errors.dob && (
                  <p className="text-red-400 text-sm mt-1">{errors.dob}</p>
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
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
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
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Postal Code <span className=" text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={values.postalcode}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Postal Code"
                  onBlur={handleBlur}
                  name="postalcode"
                  id="postalcode"
                />
                {touched.postalcode && errors.postalcode && (
                  <p className="text-red-400 text-sm mt-1">{errors.postalcode}</p>
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
                />
                {touched.homePhone && errors.homePhone && (
                  <p className="text-red-400 text-sm mt-1">{errors.homePhone}</p>
                )}
              </div>     
            </div>
          </div>

          {/* Job Information */}
          <div className=" border border-gray-200 rounded-md dark:border-gray-600 px-8 py-8 mt-6">
            <h1 className=" font-bold text-xl pb-4 text-purple-600 dark:text-purple-500">
              Job Information
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
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
                  disabled={role !== "ROLE_MANAGER"}
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
                <input
                  type="text"
                  value={values.department}
                  onChange={handleChange}
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Department"
                  onBlur={handleBlur}
                  name="department"
                  id="department"
                  disabled={role !== "ROLE_MANAGER"}
                />
                {touched.department && errors.department && (
                  <p className="text-red-400 text-sm mt-1">{errors.department}</p>
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
                  disabled={role !== "ROLE_MANAGER"}
                >
                  <option value="" disabled>Select status</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="TEMPORARY">Temporary</option>
                  <option value="CASUAL">Casual</option>
                </select>
                {touched.employmentStatus && errors.employmentStatus && (
                  <p className="text-red-400 text-sm mt-1">{errors.employmentStatus}</p>
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
                  className="w-full py-1 px-2.5  border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Working Hours"
                  onBlur={handleBlur}
                  name="workHours"
                  id="workHours"
                  disabled={role !== "ROLE_MANAGER"}
                />
                {touched.workHours && errors.workHours && (
                  <p className="text-red-400 text-sm mt-1">{errors.workHours}</p>
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
                  disabled={role !== "ROLE_MANAGER"}
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
            <h1 className=" font-bold text-xl pb-4 text-purple-600 dark:text-purple-500">
              Bank Details
            </h1>
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
                />
                {touched.bank && errors.bank && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.bank}
                  </p>
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
                />
                {touched.accName && errors.accName && (
                  <p className="text-red-400 text-sm mt-1">{errors.accName}</p>
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
                />
                {touched.accNumber && errors.accNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.accNumber}</p>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;