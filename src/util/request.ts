import axios, { AxiosInstance } from "axios";

const request = (baseUrl = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });
  return instance;
};

export const backgroundApi = request(
  process.env.REACT_APP_BACKGROUND_SERVICE_API_BASE_URL
);
