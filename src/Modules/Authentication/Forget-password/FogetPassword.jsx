import React from 'react'
import emailIcon from '../../../assets/icons/phone.svg'
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION } from '../../../service/validation'
import { toastify } from './../../../service/toastifiy';
import { axiosInstancePublic } from '../../../service/api/apiInstance';
import { USER_URL } from '../../../service/api/apiConfig';
const FogetPassword = () => {
  const {register,formState:{errors,isSubmitting},setValue,watch,handleSubmit,}= useForm({mode:"onChange"});
  const emailValue=watch("email",'')
  const navigate=useNavigate();

  const handleEmailChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setValue("email", lowercaseValue, { shouldValidate: true });
  };
  
  const onSubmit=async(data)=>{
    try {
       const res= await axiosInstancePublic.post(USER_URL.FORGET_PASSWORD,data)
       toastify('success',"OTP Send Successfully")
       navigate('/reset-password',{state:{email:data?.email}});
    } catch (error) {
      console.log(error);   
      toastify('error',error.response.data.message)
    }
  }

  return (
         <>
          <div className='lh-1 '>
          <h3 className="h5">Forgot Your Password?</h3>
          <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">
            <div className={`input-group ${errors?.email?' mb-1':'mb-3'}`}>
              <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
              <div className="form-floating">
                <input {...register('email',EMAIL_VALIDATION)}  
                value={emailValue}
                onChange={handleEmailChange}
                autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                <label htmlFor="email ">Enter your mail</label>
              </div>
            </div>
            {errors?.email&&<div className="text-danger mb-3">{errors?.email?.message} </div>}

              <button disabled={isSubmitting} type='submit' className="btn btn-main w-full d-block w-100 mt-5 fw-semibold">
              {isSubmitting?<i className='fa fa-spinner fa-spin'></i>:"Submit"}</button>
          </form>
        </>
  )
}

export default FogetPassword