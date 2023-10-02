import axios, { HttpStatusCode } from "axios";
import { parseCookies } from "nookies";

const axiosInstance = axios.create({
  baseURL: "https://api-bondscape.mainnet.desmos.network",
  timeout: 20000,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Modify the request config here (add headers, authentication tokens)
  const bearerToken = parseCookies().bearer_token;

  // If token is present add it to request's Authorization Header
  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`;
  }
  return config;
});
// End of Request interceptor

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      console.warn("[AXIOS]: Unauthorized response");
    }
    const errorMsg =
      error.response?.data?.error ?? error.response?.data ?? "Unknown error";
    return Promise.reject(new Error(errorMsg));
  },
);

export default axiosInstance;
