import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path based on your project structure

const rootReducer = combineReducers({
    auth: authReducer,
    // Add more reducers here if you have them, like:
    // user: userReducer,
    // products: productsReducer,
});

export default rootReducer;
