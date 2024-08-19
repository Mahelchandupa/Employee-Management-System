import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {

    const {isAuthenticated, loading} = useSelector(state => state.auth);

    console.log("isAuthenticated",isAuthenticated)

    return isAuthenticated ? children  : <Navigate to='/login' />
}

export default PrivateRoute