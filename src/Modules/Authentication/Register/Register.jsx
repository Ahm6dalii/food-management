import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/logo1.png'
import emailIcon from '../../../assets/icons/phone.svg'
import passIcon from '../../../assets/icons/lock.svg'
import { toastify } from '../../../Utils/toastifiy'
import { api } from '../../../Utils/Api'
import axios from 'axios';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleShowPass = () => {
    setShowPass(prev => !prev)
  }
  const handleConfirmPass = () => {
    setConfirmPass(prev => !prev)
  }
  const onSubmit = async (data) => {    
    setIsLoading(true)
    try {
      const res = await axios.post(`${api}/api/v1/Users/Register`, data)
      toastify('success', "Register Successfully")
      navigate('/verify-account');
    } catch (error) {
      console.log(error);
      toastify('error', error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-white">
      <div className="container-fluid overlay">
        <div className="row  min-vh-100 justify-content-center align-items-center">
          <div className="col-sm-10 col-md-9 bg-white rounded px-5 py-3 ">
            <div className="logo text-center">
              <img src={logo} alt="logo" className="w-50" />
            </div>
            <div className='lh-1'>
              <h3 className="h5">Register</h3>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">
              <div className="row gx-5">
                <div className='col-md-6'>
                  <div className={`input-group ${errors.username ? ' mb-1' : 'mb-3'}`}>
                    <span className="input-group-text"><i className="fa-solid fa-user text-secondary"></i></span>
                    <div className="form-floating">
                      <input {...register('userName', {
                        required: 'UserName is required',
                        minLength:{
                          value:3,
                          message:'UserName must be at least 3 characters'
                        }
                      })} autoComplete="true" type="username" className="form-control" id="username" placeholder="username" />
                      <label htmlFor="username ">UserName</label>
                    </div>
                  </div>
                  {errors.userName && <div className="text-danger mb-3">{errors.userName.message} </div>}
                </div>
                <div className='col-md-6'>
                  <div className={`input-group ${errors.email ? ' mb-1' : 'mb-3'}`}>
                    <span className="input-group-text"><i className="fa-solid fa-envelope text-secondary"></i></span>
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
                </div>

              </div>
              <div className="row gx-5">
                <div className='col-md-6'>
                  <div className={`input-group ${errors.country ? ' mb-1' : 'mb-3'}`}>
                    <span className="input-group-text"><i className="fa-solid fa-earth-americas text-secondary"></i></span>
                    <div className="form-floating">
                      <input {...register('country', {
                        required: 'Country is required',
                        minLength: {
                          value: 3,
                          message: 'Country must be at least 3 characters'
                        }
                      })} autoComplete="true" type="text" className="form-control" id="country" placeholder="country" />
                      <label htmlFor="country ">Country</label>
                    </div>
                  </div>
                  {errors.country && <div className="text-danger mb-3">{errors.country.message} </div>}
                </div>
                <div className='col-md-6'>
                  <div className={`input-group ${errors.phoneNumber ? ' mb-1' : 'mb-3'}`}>
                    <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
                    <div className="form-floating">
                      <input {...register('phoneNumber', {
                        required: 'Phone is required',
                        pattern: {
                          value: /^01(0|1|2)[0-9]{8}$/,
                          message: 'Phone is invalid must start with (011-012-010)'
                        },
                        maxLength: {
                          value: 11,
                          message: 'Phone must be at 11 characters'
                        }
                      })} autoComplete="true" type="tel" className="form-control" id="phone" placeholder="phone" />
                      <label htmlFor="phone ">PhoneNumber</label>
                    </div>
                  </div>
                  {errors.phoneNumber && <div className="text-danger mb-3">{errors.phoneNumber.message} </div>}
                </div>

              </div>
              <div className="row gx-5">
              <div className='col-md-6'>
              <div className={`input-group ${errors.password? ' mb-1' : 'mb-3'}`}>                    <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
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
                </div>
              <div className='col-md-6 '>
              <div className={`input-group ${errors.confirmPassword? ' mb-1' : 'mb-3'}`}>
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
                </div>

              </div>

              <div className='d-flex justify-content-end mb-4'>
                <Link to='/' className='text-decoration-none  text-cus-primary fw-medium fs-6'>Login Now?</Link>
              </div>
              <button disabled={isLoading} type='submit' className="btn btn-main w-full d-block w-75 mx-auto fw-semibold">
                {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Register"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register