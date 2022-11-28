import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "http://localhost:5000",
});

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = `Bearer ${user?.token}`;
    console.log("Service - Api", `Bearer ${user?.token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
