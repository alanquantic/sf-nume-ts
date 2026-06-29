/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';

import env from '@/utils/constants';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url as string | undefined;
    const isAuthRoute = requestUrl?.includes('/auth/login');

    if (status === 401 && !isAuthRoute) {
      storage.clearToken();

      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.assign(window.location.origin);
      }
    }

    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
