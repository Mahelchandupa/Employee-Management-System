import axios from 'axios';
import { refreshToken } from '../redux/actions/authActions';
import store from '../redux/store';

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return store.dispatch(refreshToken()).then(() => {
        const newToken = localStorage.getItem('accessToken');
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);
