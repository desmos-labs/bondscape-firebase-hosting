import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-bondscape.mainnet.desmos.network",
  timeout: 15000,
});

export default axiosInstance;
