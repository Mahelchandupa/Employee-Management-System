import { Link, useNavigate } from "react-router-dom";
import EmployeeAvatar from "../assets/employee-avatar-ico.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function UserProfile() {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

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
          {user?.firstName} {user?.lastName}
        </h2>
        <p className=" text-lg lg:text-xl text-gray-500 dark:text-gray-400">
          {user?.jobTitle}
        </p>
        <p className="mt-1 text-lg  bg-yellow-200 px-6 dark:bg-yellow-100 text-gray-500 dark:text-black">
          {user?.email}
        </p>
      </div>
      <div className=" flex justify-between items-center px-3 lg:max-w-lg mx-auto mt-5">
        <Link
          to="/update-employee"
          className="text-lg rounded-md text-black hover:font-medium dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
        >
          Update Profile
        </Link>
        <span className=" dark:text-gray-300">|</span>
        <Link
          to="/reset-password"
          className="text-lg rounded-md text-black hover:font-medium dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
        >
          Reset Password
        </Link>
        <span className=" dark:text-gray-300">|</span>
        <Link
          to="/two-factor-auth"
          className="text-lg rounded-md text-black hover:font-medium  dark:text-purple-500 hover:bg-primary-dark dark:hover:text-purple-300 transition duration-300"
        >
          Enable 2FA
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
