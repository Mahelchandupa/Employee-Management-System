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
import UserProfile from "../pages/UserProfile";
import Enable2FA from "../pages/Enable2FA";
import TwoFaVarification from "../pages/TwoFaVarification";
import ResetPasswordFristAttempt from "../pages/ResetPasswordFristAttempt";
import HrRegistration from "../pages/HrRegistration";

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
        path: "/update-employee/:id",
        element: (
          <PrivateRoute>
            <UpdateEmployeeForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
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
        path: "/two-factor-auth",
        element: (
          <PrivateRoute>
            <Enable2FA />
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
        path: "/first-attm-reset-password",
        element: (
          <PrivateRoute>
            <ResetPasswordFristAttempt />
          </PrivateRoute>
        ),
      },
      {
        path: "/hr-regitration",
        element: (
          <PrivateRoute>
            <HrRegistration />
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
      {
        path: "/two-fa-varification",
        element: <TwoFaVarification />,
      },
    ],
  },
]);

export default router;
