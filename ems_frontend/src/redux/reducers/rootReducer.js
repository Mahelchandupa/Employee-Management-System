import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    employee: employeeReducer,
    // products: productsReducer,
});

export default rootReducer;
