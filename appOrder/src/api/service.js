import axios from 'axios';
const env = process.env.NODE_ENV;

export const getAccessToken = function() {
  return localStorage.getItem('access_token'); // should hold passport authentication token
};

export const baseUrl =
  env === 'development' || env === 'staging'
    ? process.env.LOCAL_API_URL
    : process.env.PRODUCTION_API_URL;

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json'
  }
});

//add authorization token to the request
http.interceptors.request.use(
  request => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
