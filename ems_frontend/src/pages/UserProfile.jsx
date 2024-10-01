import { Link, useNavigate } from "react-router-dom";
import EmployeeAvatar from "../assets/employee-avatar-ico.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ROLES } from "../utils/permission";

function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { role } = authUser;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" max-w-4xl mx-auto bg-transparent">
      <div className="flex flex-col items-center p-4 gap-4">
        <div className="relative w-24 h-24 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-primary dark:border-purple-700">
          <img
            src={EmployeeAvatar}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute bottom-0 right-0 p-1 bg-primary dark:bg-purple-700 rounded-full text-white">
                    <FaUserCircle className="w-5 h-5" />
                  </div> */}
        </div>
        <h2 className="mt-4 text-xl lg:text-5xl font-bold text-gray-800 dark:text-white capitalize">
          {authUser.role === ROLES.ROLE_EMPLOYEE
            ? user?.firstName
            : authUser.firstName}{" "}
          {authUser.role === ROLES.ROLE_EMPLOYEE
            ? user?.lastName
            : authUser.lastName}
        </h2>
        <p className=" text-lg lg:text-xl text-gray-500 dark:text-gray-400">
          {authUser.role === ROLES.ROLE_EMPLOYEE ? user?.jobTitle : authUser.role === ROLES.ROLE_MANAGER ? 'Manager' : 'Admin'} 
        </p>
        <p className="mt-1 text-lg  bg-yellow-200 px-6 dark:bg-yellow-100 text-gray-500 dark:text-black">
          {user?.email}
        </p>
      </div>

      <div className=" flex justify-between items-center px-3 lg:max-w-lg mx-auto mt-5">
        {role !== ROLES.ROLE_MANAGER && role !== ROLES.ROLE_ADMIN && (
          <div>
            <Link
              to={`/update-employee/${user?.id}`}
              className=" text-sm md:text-lg rounded-md text-black hover:font-medium dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
            >
              Update Profile
            </Link>
            <span className=" dark:text-gray-300">|</span>
          </div>
        )}
        <Link
          to="/reset-password"
          className=" text-sm md:text-lg rounded-md text-black hover:font-medium dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
        >
          Reset Password
        </Link>
        <span className=" dark:text-gray-300">|</span>
        <Link
          to="/two-factor-auth"
          className=" text-sm md:text-lg rounded-md text-black hover:font-medium  dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
        >
          Enable 2FA
        </Link>
      </div>

      {role === ROLES.ROLE_EMPLOYEE && (
        <div className="mt-8 space-y-8">
          {/* Personal Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>DOB:</strong> {user?.dob}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Gender:</strong> {user?.gender}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Mobile:</strong> {user?.mobile}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Home Phone:</strong> {user?.homePhone}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> {user?.address}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Postal Code:</strong> {user?.postalCode}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>NIC:</strong> {user?.nic}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>City:</strong> {user?.city}
              </p>
            </div>
          </div>

          {/* Job-Related Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Job-Related Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Department:</strong> {user?.department}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Job Title:</strong> {user?.jobTitle}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Employment Status:</strong> {user?.employmentStatus}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Salary:</strong> ${user?.salary}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Work Hours:</strong> {user?.workHours} hours/week
              </p>
            </div>
          </div>

          {/* Banking Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Banking Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Bank:</strong> {user?.bank}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Branch:</strong> {user?.branch}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Account Name:</strong> {user?.accName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Account Number:</strong> {user?.accNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
