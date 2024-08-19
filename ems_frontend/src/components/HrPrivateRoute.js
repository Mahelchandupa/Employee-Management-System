import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { ROLES } from "../utils/permission";

function HrPrivateRoute({ children }) {

    const {isAuthenticated, user} = useSelector(state => state.auth);
    const { role } = user;

    return role === ROLES.ROLE_MANAGER ? children  : <Navigate to='/401' />
}

export default HrPrivateRoute