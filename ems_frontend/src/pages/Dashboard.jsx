import { FaBuilding } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { ROLES } from "../utils/permission";
import ManagerTable from "../components/ManegerTable";

const AdminDashboard = () => {
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
  const { role, authorities } = authUser;
  const { users } = useSelector((state) => state.user);
  const { totalRecord } = users || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" w-full">
      <div className="flex justify-center flex-wrap -mx-4">
        <div className=" w-full sm:w-2/4 lg:w-1/3 xl:w-1/4 px-4 mb-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow border-b-2 border-yellow-300">
            <div className=" w-12 h-12 rounded-full flex items-center justify-center bg-yellow-300">
              <FaBuilding className="text-2xl text-black" />
            </div>
            <h2 className=" text-xl md:text-4xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
              6
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Number of Departments
            </p>
          </div>
        </div>
        <div className=" w-full sm:w-2/4 lg:w-1/3 xl:w-1/4 px-4 mb-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow border-b-2 border-pink-300">
            <div className=" w-12 h-12 rounded-full flex items-center justify-center bg-pink-300">
              <FaUsers className="text-2xl text-black" />
            </div>
            <h2 className=" text-xl md:text-4xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
              {totalRecord || 0}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Number of Employees
            </p>
          </div>
        </div>
        {/* <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow border-b-2 border-green-300">
          <div className=" w-12 h-12 rounded-full flex items-center justify-center bg-green-300">
            <GrProjects className="text-2xl text-black" />
          </div>
          <h2 className=" text-xl md:text-4xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
            78
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Completed Projects
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow border-b-2 border-orange-400">
          <div className=" w-12 h-12 rounded-full flex items-center justify-center bg-orange-400">
            <ImUsers className="text-2xl text-black" />
          </div>
          <h2 className=" text-xl md:text-4xl font-bold mb-2 text-center text-gray-800 dark:text-gray-200">
            64
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Number of Clients
          </p>
        </div>
      </div> */}
      </div>
      {role === ROLES.ROLE_ADMIN ? <ManagerTable /> : <EmployeeTable />}
    </div>
  );
};

export default AdminDashboard;
