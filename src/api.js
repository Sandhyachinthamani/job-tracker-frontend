import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-production-1db0.up.railway.app/"
});

export default API;
