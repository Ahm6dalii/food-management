import React, {  useState } from 'react'
import logo from '../../assets/logo/logo1.png'
import emailIcon from '../../assets/icons/phone.svg'
import passIcon from '../../assets/icons/lock.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toastify } from '../../Utils/toastifiy'
import { api } from '../../Utils/Api'
const Login = () => {
  const [showPass,setShowPass]=useState(false);
  const {register,formState:{errors},handleSubmit}=useForm();
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  const handleShowPass=()=>{
    setShowPass(prev=>!prev)
  }
  const onSubmit=async(data)=>{
    setIsLoading(true)
    try {
       const res= await axios.post(`${api}/api/v1/Users/Login`,data)
       toastify('success',"Login Successfully")
       navigate('/dashboard');
    } catch (error) {
      console.log(error);   
      toastify('error',error.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <>
 <div className="authentication-container">
        <div className="container-fluid overlay">
          <div className="row  min-vh-100 justify-content-center align-items-center">
            <div className="col-sm-10 col-md-7 bg-white rounded px-5 py-5 ">
              <div className="logo text-center">
                <img src={logo} alt="logo" className="w-50" />
              </div>
              <div className='lh-1'>
              <h3 className="h5">Login</h3>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
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
                    })}  autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                    <label htmlFor="email ">Enter your E-mail</label>
                  </div>
                </div>
                {errors.email&&<div className="text-danger mb-3">{errors.email.message} </div>}

                <div className="input-group mb-1 ">
                  <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
                  <div className="form-floating position-relative">
                    <input {...register('password',{
                      required:'Password is required',
                      minLength:{
                        value:6,
                        message:'Password must be at least 6 characters'
                      }
                    })} autoComplete="true" type={showPass?"text":"password"} className="form-control" id="floatingInputGroup1" placeholder="Username" />
                    <label htmlFor="floatingInputGroup1">Password </label>            
                  <button onClick={handleShowPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-4 translate-middle-y'>
                    {showPass?<i  className="fa-solid fa-eye "></i>:<i className="fa-solid fa-eye-slash "></i>}
                  </button>
                  </div>
                </div>
                {errors.password&&<div className="text-danger mb-3">{errors.password.message} </div>}
                  <div className='d-flex justify-content-between align-items-center mb-4'>
                    <Link to='/register' className='text-decoration-none   fw-medium text-secondary-emphasis fs-6 '>Register Now?</Link>
                    <Link to='/forget-pass' className='text-decoration-none  text-cus-primary fw-medium fs-6'>Forget Password?</Link>
                  </div>
                  <button disabled={isLoading} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
                  {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login