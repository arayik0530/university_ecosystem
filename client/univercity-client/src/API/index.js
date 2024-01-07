import axios from 'axios';

export const API = axios.create({
    baseURL: "http://localhost:8090/api/",
    headers: {
        "Content-Type": "application/json",
    }
});

API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // showError(error);
        alert(error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // showError(error.response.status);
            alert(error.response.status);
        } else {
            // showError(error.message);
            alert(error.message);
        }
        return Promise.reject(error);
    }
);

export default API;
