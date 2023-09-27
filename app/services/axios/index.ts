import axios, { HttpStatusCode } from "axios";
import { parseCookies } from "nookies";

const axiosInstance = axios.create({
  baseURL: "https://api-bondscape.mainnet.desmos.network",
  timeout: 60000,
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
      console.log("[AXIOS]: Unauthorized response");
    }
    console.log(JSON.stringify(error.response));
    return Promise.reject(error);
  },
);

export default axiosInstance;
