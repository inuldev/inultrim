import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add an interceptor to log requests (for debugging)
axiosInstance.interceptors.request.use((request) => {
  console.log("Starting Request:", request.url);
  return request;
});
