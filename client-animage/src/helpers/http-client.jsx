import axios from 'axios'

export const animageApi = axios.create({
    baseURL: "https://animage.fabtazticcorp.my.id/"
});