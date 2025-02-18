import React, { useState } from 'react'
import logo from '../../assets/logo/logo1.png'
import emailIcon from '../../assets/icons/phone.svg'
import passIcon from '../../assets/icons/lock.svg'
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toastify } from '../../Utils/toastifiy'
import { api } from '../../Utils/Api'


const VerifyAccount = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      setIsLoading(true)
      try {        
        const res = await axios.put(`${api}/api/v1/Users/verify`, data)
        toastify('success', "Account Verified Successfully")
        navigate('/');
      } catch (error) {
        console.log(error);
        toastify('error', error.response.data.message)
      } finally {
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
                   <h3 className="h5"> Verify Account  </h3>
                   <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">
                   <div className={`input-group ${errors.email ? ' mb-1' : 'mb-3'}`}>
                     <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
                     <div className="form-floating">
                       <input {...register('email', {
                         required: 'Email is required',
                         pattern: {
                           value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                           message: 'Email is invalid'
                         }
                       })} autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                       <label htmlFor="email ">Enter your E-mail</label>
                     </div>
                   </div>
                   {errors.email && <div className="text-danger mb-3">{errors.email.message} </div>}
   
                   <div className={`input-group ${errors.code ? ' mb-1' : 'mb-3'}`}>
   
                     <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                     <div className="form-floating position-relative">
                       <input {...register('code', {
                         required: 'Otp is required',
                         maxLength: {
                           value: 4,
                           message: 'Otp must be at 6 characters'
                         },
   
                       })} autoComplete="true" type="text" className="form-control" id="otp" placeholder="OTP" />
                       <label htmlFor="otp">OTP</label>
                    
                     </div>
                   </div>
                   {errors.code && <div className="text-danger mb-3">{errors.code.message} </div>}
   
               
   
                   <button disabled={isLoading} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
                     {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Send"}</button>
                 </form>
               </div>
             </div>
           </div>
         </div>
  )
}

export default VerifyAccount