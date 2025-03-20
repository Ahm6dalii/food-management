import axios from "axios"
import { baseURL } from "./apiConfig"

//public 
export const axiosInstancePublic = axios.create({
    baseURL:baseURL,

 })
//private 
 export const axiosInstancePrivate = axios.create({
    baseURL:baseURL,
   
 })

 axiosInstancePrivate.interceptors.request.use(
   (config) => {      
     const token = localStorage.getItem("token"); // Get latest token
     if (token) {
       config.headers.Authorization = `${token}`;
     } else {
       delete config.headers.Authorization; // Remove Authorization if no token
     }
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );
