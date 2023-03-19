import axios from "axios";
import { logOut } from "../helper";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = "http://localhost:5000/";
var accessToken = cookies.get('accessToken');
// let accessToken = localStorage.getItem('accessToken')

const headers = {
  "Authorization": `Bearer ${accessToken}`,
  "Content-Type": "application/json"
};

export const $host = axios.create({
  baseURL: API_URL,
  headers: headers
});

$host.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 404) {
    window.location.href = "http://localhost:3000/fddfdfbdfbd/dsasad"
  }
  if(error.response.status === 401) {
    console.log(error)
    logOut();
    return window.location.reload();
  }
  return Promise.reject(error);
});
