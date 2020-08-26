import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.15:5000", // if you're using expo-cli
});

export default api;
