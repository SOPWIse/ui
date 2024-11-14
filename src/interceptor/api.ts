import axios, { type CreateAxiosDefaults } from "axios";
import { BASE_URL } from "../constants";

const baseUrl = BASE_URL;

const defaultOptions = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
} satisfies CreateAxiosDefaults<any>;

// Create instance
export const api = axios.create(defaultOptions);

// Set the auth token and role for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const MAX_RETRIES = 1;

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      let retryCount = 0;
      while (retryCount < MAX_RETRIES) {
        try {
          const response = await api.request(error.config);
          return response;
        } catch (retryError) {
          retryCount++;
          if (retryCount >= MAX_RETRIES) {
            // If maximum retries reached, delete access token
            localStorage.removeItem("access_token");
            return Promise.reject(retryError);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
