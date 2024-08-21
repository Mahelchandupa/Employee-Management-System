// import { createStore, applyMiddleware, compose } from 'redux';
// import {thunk} from 'redux-thunk';
// import rootReducer from './reducers/rootReducer';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/rootReducer'

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)