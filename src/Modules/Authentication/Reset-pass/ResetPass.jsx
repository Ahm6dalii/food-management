import React, { useState } from 'react'
import logo from '../../../assets/logo/logo1.png'
import emailIcon from '../../../assets/icons/phone.svg'
import passIcon from '../../../assets/icons/lock.svg'
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toastify } from '../../../Utils/toastifiy'
import { api } from '../../../Utils/Api'

const ResetPass = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const { register, formState: { errors },watch,setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailValue = watch("email", "");

  const handleEmailChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setValue("email", lowercaseValue, { shouldValidate: true });
  };
  const handleShowPass = () => {
    setShowPass(prev => !prev)
  }
  const handleConfirmPass = () => {
    setConfirmPass(prev => !prev)
  }
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await axios.post(`${api}/api/v1/Users/Reset`, data)
      toastify('success', "Password Changed Successfully")
      navigate('/');
    } catch (error) {
      console.log(error);
      toastify('error', error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="authentication-container">
        <div className="container-fluid overlay">
          <div className="row  min-vh-100 justify-content-center align-items-center">
            <div className="col-sm-10 col-md-7 bg-white rounded px-5 py-3 ">
              <div className="logo text-center">
                <img src={logo} alt="logo" className="w-50" />
              </div>
              <div className='lh-1'>
                <h3 className="h5">Reset  Password</h3>
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
                    })}
                      value={emailValue}
                      onChange={handleEmailChange}
                     autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                    <label htmlFor="email ">Enter your E-mail</label>
                  </div>
                </div>
                {errors.email && <div className="text-danger mb-3">{errors.email.message} </div>}

                <div className={`input-group ${errors.otp ? ' mb-1' : 'mb-3'}`}>

                  <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                  <div className="form-floating position-relative">
                    <input {...register('seed', {
                      required: 'Otp is required',
                      maxLength: {
                        value: 6,
                        message: 'Otp must be at 6 characters'
                      },

                    })} autoComplete="true" type="text" className="form-control" id="otp" placeholder="OTP" />
                    <label htmlFor="otp">OTP</label>
                 
                  </div>
                </div>
                {errors.otp && <div className="text-danger mb-3">{errors.otp.message} </div>}

                <div className={`input-group ${errors.password ? ' mb-1' : 'mb-3'}`}>

                  <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                  <div className="form-floating position-relative">
                    <input {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })} autoComplete="true" type={showPass ? "text" : "password"} className="form-control" id="floatingInputGroup1" placeholder="Username" />
                    <label htmlFor="floatingInputGroup1">Password </label>
                    <button onClick={handleShowPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-4 translate-middle-y'>
                      {showPass ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash "></i>}
                    </button>
                  </div>
                </div>
                {errors.password && <div className="text-danger mb-3">{errors.password.message} </div>}

                <div className={`input-group ${errors.confirmPassword ? ' mb-1' : 'mb-3'}`}>

                  <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                  <div className="form-floating position-relative">
                    <input {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })} autoComplete="true" type={showConfirmPass ? "text" : "password"} className="form-control" id="confirm-password" placeholder="Username" />
                    <label htmlFor="confirm-password">Confirm Password </label>
                    <button onClick={handleConfirmPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-4 translate-middle-y'>
                      {showConfirmPass ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash"></i>}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && <div className="text-danger mb-3">{errors.confirmPassword.message} </div>}


                <button disabled={isLoading} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
                  {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Reset Password"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPass