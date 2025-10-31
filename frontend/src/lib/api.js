import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // enable this if you use cookies for auth:
  // withCredentials: true,
});