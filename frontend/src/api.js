import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://ethnus-codemithra-dashboard.onrender.com",
  baseURL: "https://ethnus-codemithra-dashboard-production.up.railway.app",
});

export default API;
