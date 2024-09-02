import { NavLink } from "react-router-dom";
import { FaChartBar, FaCog, FaUser, FaQuestionCircle } from "react-icons/fa";
import "../assets/oval.svg";
import { useSelector } from "react-redux";
import { ROLES } from "../utils/permission";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { role } = authUser != null && authUser;

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } -translate-x-full transition-transform duration-200 ease-in-out w-60 bg-sidebar-bg py-4 lg:transform-none lg:relative lg:translate-x-0`}
    >
      <div className="flex items-center justify-center px-4">
        <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="font-pop text-white font-bold">IT</span>
        </div>
        <span className="ml-2 font-pop text-blue-700 font-bold text-xs tracking-wide">
          SOLUTION
        </span>
      </div>
      <nav className="mt-10">
        <SidebarItem
          to="/"
          icon={<FaChartBar />}
          label="Dashboard"
          toggleSidebar={toggleSidebar}
        />
        {(role === ROLES.ROLE_MANAGER || role === ROLES.ROLE_ADMIN) && (
          <SidebarItem
            to="/manage-employee"
            icon={<FaUser />}
            label="Manage Employees"
            toggleSidebar={toggleSidebar}
          />
        )}
        {role === ROLES.ROLE_EMPLOYEE && (
          <SidebarItem to="/user-profile" icon={<FaUser />} label="Profile" />
        )}
        <div className="ml-4 mt-6 text-gray-600 font-pop font-medium text-xs tracking-wide opacity-50">OTHERS</div>
        <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />
        <SidebarItem to="/help" icon={<FaQuestionCircle />} label="Help" />
      </nav>
      <button
        className="absolute top-4 right-4 lg:hidden text-xl dark:text-white"
        onClick={toggleSidebar}
      >
        X
      </button>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label, toggleSidebar }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 pl-6 transition-colors ${
          isActive
            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500 dark:text-white"
            : "text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-500"
        }`
      }
      onClick={toggleSidebar}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="ml-3 font-pop text-sm tracking-wide">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
