import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // ✅ point to backend
  withCredentials: true, // if you use cookies/JWT
});

export default api;
