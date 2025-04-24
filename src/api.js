import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-production.up.railway.app/api"
});

export default API;
