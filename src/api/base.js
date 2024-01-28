import axios from "axios";
import { store } from "../store";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URI || "http://localhost:5000",
});

client.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
