import { createBrowserRouter,RouterProvider, ScrollRestoration } from 'react-router-dom'
import './App.css'
import AuthLayout from './Modules/shared/AuthLayout/AuthLayout'
import Login from './Modules/Authentication/Login/Login';
import Register from './Modules/Authentication/Register/Register';
import ResetPassword from './Modules/Authentication/Reset-password/ResetPassword';
import MasterLayout from './Modules/shared/MasterLayout/MasterLayout';
import CategoriesList from './Modules/Categories/CategoriesList/CategoriesList';
import CategoriesData from './Modules/Categories/CategoriesData/CategoriesData';
import { RecipeList } from './Modules/Recpies/RecipeList/RecipeList';
import RecipeData from './Modules/Recpies/RecipeData/RecipeData';
import NotFound from './Modules/shared/NotFound/NotFound';
import FogetPassword from './Modules/Authentication/Forget-password/FogetPassword';
import Dashboard from './Modules/Dashboard/Dashboard';
import Toastifiy from './Modules/shared/Toastify/Toastifiy';
import VerifyAccount from './Modules/Authentication/Verify-account/VerifyAccount';
import {  useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Modules/shared/ProtectedRoute/ProtectedRoute';
import Users from './Modules/Users/Users';
import ChangePassword from './Modules/Authentication/Change-password/ChangePassword';


function App() {
  const[loginData,setLoginData]=useState(()=>{
    if(localStorage.getItem('token')!=null){
      return jwtDecode(localStorage.getItem('token'))
    }
  })

    const SaveLoginData=()=>{
      const data=localStorage.getItem('token')
      const loginDataDecode= jwtDecode(data);
      console.log(loginDataDecode); 
      setLoginData(loginDataDecode)
    }

    useEffect(()=>{
      if(localStorage.getItem('token')!=null){
        SaveLoginData()}
    },[])

const router=createBrowserRouter([
  {patth:'/',element:<AuthLayout />,errorElement:<NotFound/>,children:[
    {index:true,element:<Login SaveLoginData={SaveLoginData}/>},
    {path:'register',element:<Register/>},
    {path:'forget-password',element:<FogetPassword/>},
    {path:'reset-password',element:<ResetPassword/>},
    {path:'verify-account',element:<VerifyAccount/>},
  ]},
  {path:'/dashboard',element:<ProtectedRoute><MasterLayout loginData={loginData} saveLoginData={SaveLoginData} /></ProtectedRoute>,errorElement:<NotFound/>,children:[
    {index:true,element:<Dashboard/>},
    {path:'users',element:<Users/>},
    {path:'categories',element:<CategoriesList/>},
    {path:'categories-data',element:<CategoriesData/>},
    {path:'recipies',element:<RecipeList/> },
    {path:'recipies-data/new-recipe',element:<RecipeData/>},
    {path:'recipies-data/:id',element:<RecipeData/>},
    {path:'change-password',element:<ChangePassword/>},
  ]}
])

  return (
    <>
       <Toastifiy/>
      <RouterProvider  router={router} >   </RouterProvider>
    </>
  )
}

export default App