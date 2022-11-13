import axios from 'axios';

export const getRequest = (url) => {
    return axios.get(url);
}

export const postRequest = (url, body) => {
    return axios.post(url, body);
}