import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("token");
    const userToken = localStorage.getItem("userToken");

    // Admin routes
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    // User routes (future use)
    if (!adminToken && userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;