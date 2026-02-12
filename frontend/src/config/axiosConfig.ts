import axios from 'axios';

export type ApiErrorResponse = {
  status: string;
  detail: string;
};

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await axios.post('/api/auth/logout');

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const statusCode = error.response?.status ?? '';

    const message =
      error?.response?.data?.detail ||
      (error.message === 'Network Error'
        ? 'CORS error atau server tidak merespons.'
        : error.message || 'Terjadi kesalahan.');

    const errorResponse = {
      status: 'error',
      detail: `${statusCode} ${message}`,
    };

    return Promise.reject(errorResponse);
  },
);

export default axiosInstance;