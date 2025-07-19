import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  const token = userInfo.authToken;

  if (token && config.headers) {
    config.headers.set("Authorization", `${token}`);
  }

  return config;
});
