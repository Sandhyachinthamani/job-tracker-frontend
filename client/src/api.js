import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your deployed URL later
});

export default API;
