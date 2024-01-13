import axios from 'axios';
import { EventEmitter } from 'events';

export const API = axios.create({
    baseURL: "http://localhost:8090/api/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method":"*",
        "Content-Type": "application/json",
        ...(localStorage.getItem('token') ? {"Authorization": `Bearer_ ${localStorage.getItem('token')}`} : {})
    }
});

export const eventEmitter = new EventEmitter();

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            eventEmitter.emit('apiError', (status === 401 || status === 403 || status === 404) ? 'Invalid credentials' : error.response.status);
        } else {
            eventEmitter.emit('apiError', error.message);
        }
        return Promise.reject(error);
    }
);

export default API;
