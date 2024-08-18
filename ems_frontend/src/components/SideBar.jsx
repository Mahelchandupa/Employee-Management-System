import { NavLink } from 'react-router-dom';
import { FaChartBar, FaShoppingCart, FaClipboardList, FaComments, FaCog, FaWallet, FaUser, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import '../assets/oval.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-0 left-0 h-full z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out w-60 bg-sidebar-bg py-4 lg:transform-none lg:relative lg:translate-x-0`}>
      <div className="flex items-center justify-center px-4">
        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="font-pop text-white font-bold">G</span>
        </div>
        <span className="ml-2 font-pop text-blue-700 font-bold text-xs tracking-wide">GOODEMPLOYEE</span>
      </div>
      <nav className="mt-10">
        <SidebarItem to="/" icon={<FaChartBar />} label="Dashboard" />
        <SidebarItem to="/manage-employee" icon={<FaUser />} label="Manage Employees" />
        <SidebarItem to="//reset-password" icon={<FaShoppingCart />} label="Reset Password" />
        {/* <SidebarItem to="/manage-menu" icon={<FaClipboardList />} label="Manage Menu" /> */}
        {/* <SidebarItem to="/customer-review" icon={<FaComments />} label="Customer Review" /> */}
        <div className="ml-4 mt-6 text-gray-600 font-pop font-medium text-xs tracking-wide opacity-50">OTHERS</div>
        <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />
        {/* <SidebarItem to="/payment" icon={<FaWallet />} label="Payment" /> */}
        {/* <SidebarItem to="/accounts" icon={<FaUser />} label="Accounts" /> */}
        <SidebarItem to="/help" icon={<FaQuestionCircle />} label="Help" />
      </nav>
      <button className="absolute top-4 right-4 lg:hidden text-xl dark:text-white" onClick={toggleSidebar}>X</button>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => {
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
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="ml-3 font-pop text-sm tracking-wide">{label}</span>
  </NavLink>
  );
};

export default Sidebar;