import axios from "axios";

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to all requests
Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
Instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    
    // Handle unauthorized access
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname.includes('/admin/login');
      if (!isLoginPage) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default Instance;