import axios from "axios"
import { baseURL } from "./apiConfig"

//public 
export const axiosInstancePublic = axios.create({
    baseURL:baseURL,

 })
//private 
 export const axiosInstancePrivate = axios.create({
    baseURL:baseURL,
    headers:{
      Authorization:localStorage.getItem('token'),
      }
 })
//private used in add recipe form data
 export const axiosInstancePrivateFormData = axios.create({
    baseURL:baseURL,
    headers:{
      Authorization:localStorage.getItem('token'),
      "Content-Type":"multipart/form-data"
      }
 })
