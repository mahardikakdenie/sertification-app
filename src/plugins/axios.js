import axios from "axios";
import store from "../store";
import router from "../router/index.js";

const url = import.meta.env.VITE_AUTH_API_URL;

const axiosClient = axios.create({
    baseURL: url,
});

export default axiosClient;
