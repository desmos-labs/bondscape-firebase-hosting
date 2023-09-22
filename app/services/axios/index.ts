import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BONDSCAPE_REST,
  timeout: 15000,
});

export default axiosInstance;
