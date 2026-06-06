import axios from "axios";

const api = axios.create({
  baseURL: "https://overhand-luckless-drab.ngrok-free.dev/api",
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;