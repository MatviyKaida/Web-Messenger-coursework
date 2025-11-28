import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:5000/api`,
    withCredentials: true
});
