import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/icons/phone.svg'
import passIcon from '../../../assets/icons/lock.svg'
import { COUNTRY_VALIDATION, EMAIL_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, USERNAME_VALIDATION } from '../../../service/validation';
import { toastify } from './../../../service/toastifiy';
import { axiosInstancePublic } from '../../../service/api/apiInstance';
import { USER_URL } from '../../../service/api/apiConfig';
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const { register, formState: { errors, isSubmitting }, handleSubmit, watch, trigger } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword")
    }
  }, [password, confirmPassword, trigger])

  const handleShowPass = () => {
    setShowPass(prev => !prev)
  }

  const handleConfirmPass = () => {
    setConfirmPass(prev => !prev)
  }

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstancePublic.post(USER_URL.REGISTER, data)
      toastify('success',res?.data?.message ,"Register Successfully Verification Code Sent to Your Email")
      navigate('/verify-account', { state: { email: data.email } });
    } catch (error) {
      console.log(error);
      toastify('error', error?.response?.data?.message || `Faild to Register`)
    }
  }

  useEffect(() => {
    document.title = "Register"
  }, [])

  return (
    <>
      <div className='lh-1'>
        <h3 className="h5">Register</h3>
        <p className='text-muted'>Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">

        <div className="row gx-4">
          <div className='col-md-6'>
            <div className={`input-group ${errors?.username ? ' mb-1' : 'mb-3'}`}>
              <span className="input-group-text"><i className="fa-solid fa-user text-secondary"></i></span>
              <div className="form-floating">
                <input {...register('userName', USERNAME_VALIDATION)} autoComplete="true" type="username" className="form-control" id="username" placeholder="username" />
                <label htmlFor="username ">UserName</label>
              </div>
            </div>
            {errors?.userName && <div className="text-danger mb-3">{errors?.userName?.message} </div>}
          </div>

          <div className='col-md-6'>
            <div className={`input-group ${errors?.email ? ' mb-1' : 'mb-3'}`}>
              <span className="input-group-text"><i className="fa-solid fa-envelope text-secondary"></i></span>
              <div className="form-floating">
                <input {...register('email', EMAIL_VALIDATION)} autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
                <label htmlFor="email ">Enter your E-mail</label>
              </div>
            </div>
            {errors?.email && <div className="text-danger mb-3">{errors?.email?.message} </div>}
          </div>
        </div>

        <div className="row gx-4">

          <div className='col-md-6'>
            <div className={`input-group ${errors?.country ? ' mb-1' : 'mb-3'}`}>
              <span className="input-group-text"><i className="fa-solid fa-earth-americas text-secondary"></i></span>
              <div className="form-floating">
                <input {...register('country', COUNTRY_VALIDATION)} autoComplete="true" type="text" className="form-control" id="country" placeholder="country" />
                <label htmlFor="country ">Country</label>
              </div>
            </div>
            {errors?.country && <div className="text-danger mb-3">{errors?.country?.message} </div>}
          </div>

          <div className='col-md-6'>
            <div className={`input-group ${errors?.phoneNumber ? ' mb-1' : 'mb-3'}`}>
              <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
              <div className="form-floating">
                <input {...register('phoneNumber', PHONE_VALIDATION)} autoComplete="true" type="tel" className="form-control" id="phone" placeholder="phone" />
                <label htmlFor="phone ">PhoneNumber</label>
              </div>
            </div>
            {errors?.phoneNumber && <div className="text-danger mb-3">{errors?.phoneNumber?.message} </div>}
          </div>

        </div>

        <div className="row gx-4">
          <div className='col-md-6'>
            <div className={`input-group ${errors?.password ? ' mb-1' : 'mb-3'}`}>                    <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
              <div className="form-floating position-relative">
                <input {...register('password', PASSWORD_VALIDATION)} autoComplete="true" type={showPass ? "text" : "password"} className="form-control" id="floatingInputGroup1" placeholder="Username" />
                <label htmlFor="floatingInputGroup1">Password </label>
                <button aria-label={showPass?"Hide password":"Show password"} onClick={handleShowPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-2 translate-middle-y'>
                <i className={`fa-solid ${showConfirmPass ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
                <span className="visually-hidden">{showPass?"Hide":"Show"}</span>
            </button>
              </div>
            </div>
            {errors?.password && <div className="text-danger mb-3">{errors?.password?.message} </div>}
          </div>
          <div className='col-md-6 '>
            <div className={`input-group ${errors.confirmPassword ? ' mb-1' : 'mb-3'}`}>
              <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
              <div className="form-floating position-relative">
                <input {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === password || 'Passwords do not match',
                })} autoComplete="true" type={showConfirmPass ? "text" : "password"} className="form-control" id="confirm-password" placeholder="Username" />

                <label htmlFor="confirm-password">Confirm Password </label>
                <button  aria-label={showConfirmPass ? 'Hide password' : 'Show password'} onClick={handleConfirmPass} type='button' className=' position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-2 translate-middle-y'>
                  <i className={`fa-solid ${showConfirmPass ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
                  <span className="visually-hidden"> {showConfirmPass ? 'Hide' : 'Show'} password </span>
                </button>
              </div>
            </div>
            {errors?.confirmPassword && <div className="text-danger mb-3">{errors?.confirmPassword?.message} </div>}
          </div>
        </div>

        <div className='d-flex justify-content-end mb-4'>
          <Link to='/' className='text-decoration-none  text-cus-primary fw-medium fs-6'>Login Now?</Link>
        </div>

        <button disabled={isSubmitting} type='submit' className="btn btn-main w-full d-block w-75 mx-auto fw-semibold">
          {isSubmitting ? <i className='fa fa-spinner fa-spin'></i> : "Register"}</button>

      </form>
    </>

  )
}

export default Register