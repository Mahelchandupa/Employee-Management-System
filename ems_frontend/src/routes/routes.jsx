import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ManageEmployee from "../pages/ManageEmployee";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: "/manage-employee",
        element: (
          <PrivateRoute>
            <ManageEmployee />
          </PrivateRoute>
        )
      },
      {
        path: "/reset-password",
        element: (
          // <PrivateRoute>
            <ResetPassword />
          // </PrivateRoute>
        )
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
]);

export default router;
