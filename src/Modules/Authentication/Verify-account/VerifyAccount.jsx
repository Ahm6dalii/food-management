import React from 'react'
import emailIcon from '../../../assets/icons/phone.svg'
import passIcon from '../../../assets/icons/lock.svg'
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, OTP_VALIDATION } from '../../../service/validation'
import { toastify } from '../../../service/toastifiy'
import { axiosInstancePublic } from '../../../service/api/apiInstance';
import { USER_URL } from '../../../service/api/apiConfig';
const VerifyAccount = () => {
    const { register, formState: { errors,isSubmitting }, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      try {        
        const res = await axiosInstancePublic.put(USER_URL.VERIFY_ACCOUNT, data)
        toastify('success', "Account Verified Successfully")
        navigate('/');
      } catch (error) {
        console.log(error);
        toastify('error', error?.response?.data?.message)
      } 
    }

  return (
         < >
                 <div className='lh-1'>
                   <h3 className="h5"> Verify Account  </h3>
                   <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                 </div>
                 
                <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">

                   <div className={`input-group ${errors?.email ? ' mb-1' : 'mb-3'}`}>
                     <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
                     <div className="form-floating">
                       <input {...register('email', EMAIL_VALIDATION)} autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                       <label htmlFor="email ">Enter your E-mail</label>
                     </div>
                   </div>
                   {errors.email && <div className="text-danger mb-3">{errors.email.message} </div>}
   
                   <div className={`input-group ${errors?.code ? ' mb-1' : 'mb-3'}`}>
                     <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                     <div className="form-floating position-relative">
                       <input {...register('code', OTP_VALIDATION)} autoComplete="true" type="text" className="form-control" id="otp" placeholder="OTP" />
                       <label htmlFor="otp">OTP</label>    
                     </div>
                   </div>
                   {errors?.code && <div className="text-danger mb-3">{errors?.code?.message} </div>}        
   
                   <button disabled={isSubmitting} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
                     {isSubmitting? <i className='fa fa-spinner fa-spin'></i> : "Send"}</button>
                 </form>
       
         </>
  )
}

export default VerifyAccount