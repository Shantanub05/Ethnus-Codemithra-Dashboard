import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://ethnus-codemithra-dashboard.onrender.com",
  baseURL: "http://65.0.95.141:5000",
});

export default API;
