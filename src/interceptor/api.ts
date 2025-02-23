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
let retryCount = 0; // Keep retryCount outside the interceptor scope

api.interceptors.response.use(
  (response) => {
    retryCount = 0; // Reset retryCount on successful response
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const originalRequest = error.config;

      if (!originalRequest._retry) {
        // Check if it's already a retry
        originalRequest._retry = true; // Set the retry flag
        retryCount++; // Increment retry count

        if (retryCount <= MAX_RETRIES) {
          // Retry only if within limit
          try {
            const response = await api.request(originalRequest); // Retry the original request
            retryCount = 0; // Reset retryCount on successful retry
            return response;
          } catch (retryError) {
            // Retry failed
            if (retryCount >= MAX_RETRIES) {
              localStorage.removeItem("access_token");
              window.location.href = "/";
              return Promise.reject(retryError); // Reject after max retries
            }
            // If you want to handle intermediate retry errors differently, you can here
            return Promise.reject(retryError); // Or just reject and stop retrying
          }
        } else {
          // Max retries reached
          localStorage.removeItem("access_token");
          window.location.href = "/";
          return Promise.reject(error); // Reject after max retries
        }
      } else {
        // Already a retry, don't retry again to prevent loops
        localStorage.removeItem("access_token");
        window.location.href = "/";
        return Promise.reject(error); // Reject and redirect
      }
    }
    return Promise.reject(error); // For errors other than 401
  }
);
