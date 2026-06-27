import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = cookie.get("Bearer");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
