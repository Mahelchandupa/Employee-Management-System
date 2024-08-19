import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ManageEmployee from "../pages/ManageEmployee";
import ResetPassword from "../pages/ResetPassword";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import NewEmployeeForm from "../components/NewEmployeeForm";
import NotPermission from "../pages/NotPermission";
import HrPrivateRoute from "../components/HrPrivateRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-employee",
        element: (
          <PrivateRoute>
            <HrPrivateRoute>
              <ManageEmployee />
            </HrPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/register-employee",
        element: (
          <PrivateRoute>
            <NewEmployeeForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-employee",
        element: (
          <PrivateRoute>
            <UpdateEmployeeForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-employees",
        element: (
          <PrivateRoute>
            <EmployeeTable />
          </PrivateRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <PrivateRoute>
            <ResetPassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/401",
        element: <NotPermission />,
      },
    ],
  },
]);

export default router;
