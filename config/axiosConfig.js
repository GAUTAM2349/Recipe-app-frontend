import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4011/api",
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = token ? `Bearer ${token}` : null;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
