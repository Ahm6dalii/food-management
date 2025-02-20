import React, { useState } from 'react'
import logo from '../../../assets/logo/logo1.png'
import emailIcon from '../../../assets/icons/phone.svg'
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toastify } from '../../../Utils/toastifiy'
import { api } from '../../../Utils/Api'

const FogetPass = () => {
  const {register,formState:{errors},setValue,watch,handleSubmit}=useForm();
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  const emailValue = watch("email", "");
  const handleEmailChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setValue("email", lowercaseValue, { shouldValidate: true });
  };

  const onSubmit=async(data)=>{
    setIsLoading(true)
    try {
       const res= await axios.post(`${api}/api/v1/Users/Reset/Request`,data)
       toastify('success',"Login Successfully")
       navigate('/reset-pass');
    } catch (error) {
      console.log(error);   
      toastify('error',error.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="authentication-container">
    <div className="container-fluid overlay">
      <div className="row  min-vh-100 justify-content-center align-items-center">
        <div className="col-sm-10 col-md-7 bg-white rounded px-5 py-5 ">
          <div className="logo text-center">
            <img src={logo} alt="logo" className="w-50" />
          </div>
          <div className='lh-1'>
          <h3 className="h5">Forgot Your Password?</h3>
          <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">
            <div className={`input-group ${errors.email?' mb-1':'mb-3'}`}>
              <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
              <div className="form-floating">
                <input {...register('email',{
                  required:'Email is required',
                  pattern:{
                    value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message:'Email is invalid'
                  }
                }
              )}  
                value={emailValue}
                onChange={handleEmailChange}
                autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                <label htmlFor="email ">Enter your mail</label>
              </div>
            </div>
            {errors.email&&<div className="text-danger mb-3">{errors.email.message} </div>}

              <button disabled={isLoading} type='submit' className="btn btn-main w-full d-block w-100 mt-5 fw-semibold">
              {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Submit"}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FogetPass