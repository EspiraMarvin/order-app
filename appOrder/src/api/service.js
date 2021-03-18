import axios from 'axios';
const env = process.env.NODE_ENV;
const token = localStorage.getItem('access_token') || null;

export const baseUrl =
  env === 'development' || env === 'staging'
    ? process.env.LOCAL_API_URL
    : process.env.PRODUCTION_API_URL;

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
});
