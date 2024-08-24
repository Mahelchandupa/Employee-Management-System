import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { ROLES } from "../utils/permission";

function HrPrivateRoute({ children }) {

    const {isAuthenticated, authUser} = useSelector(state => state.auth);
    const { role } = authUser;

    return role === ROLES.ROLE_MANAGER || role === ROLES.ROLE_ADMIN ? children  : <Navigate to='/401' />
}

export default HrPrivateRoute