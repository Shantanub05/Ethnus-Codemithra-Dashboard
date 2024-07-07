import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://ethnus-codemithra-dashboard.onrender.com",
});

export default API;
