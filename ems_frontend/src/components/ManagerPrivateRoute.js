import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { ROLES } from "../utils/permission";

function ManagerPrivateRoute({ children }) {

    const {isAuthenticated, authUser} = useSelector(state => state.auth);
    const { role } = authUser;

    return role === ROLES.ROLE_MANAGER ? children  : <Navigate to='/401' />
}

export default ManagerPrivateRoute