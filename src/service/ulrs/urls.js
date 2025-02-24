import axios from "axios"

 export const baseURL="https://upskilling-egypt.com:3006/api/v1/"

//public 
 export const axiosInstancePublic = axios.create({
    baseURL:baseURL,

 })
//private 
 export const axiosInstancePrivate = axios.create({
    baseURL:baseURL,
    headers:{
      Authorization:localStorage.getItem('token')
      }
 })


 export const USER_URL={
    LOGIN:"Users/Login" ,
    REGISTER:"Users/Register",
    FORGET_PASSWORD:"Users/Reset/Request",
    RESET_PASSWORD:"Users/Reset",
    VERIFY_ACCOUNT:"Users/verify",
    GET_USER:(id)=>`/User/${id}`

 }
 export const RECEIPE_URL={
    GET_RECIPE:"Recipe/?pageSize=10&pageNumber=1",
    DELETE_RECIPE:(id)=>`Recipe/${id}`
    
 }
 export const CATEGORY_URL={
    GET_CATOGERY:"Category/?pageSize=10&pageNumber=1",
    DELETE_CATOGERY:(id)=>`Category/${id}`
 }