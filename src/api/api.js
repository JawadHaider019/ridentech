import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;



const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json",
    },
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("admin_token");

    if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export default api;