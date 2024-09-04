import axios from 'axios'

export const animageApi = axios.create({
    baseURL: "http://localhost:3000"
});