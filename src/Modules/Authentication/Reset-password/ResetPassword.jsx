import React, { useEffect, useState } from 'react'
import emailIcon from '../../../assets/icons/phone.svg'
import passIcon from '../../../assets/icons/lock.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from '../../../service/validation'
import { toastify } from './../../../service/toastifiy';
import { axiosInstancePublic } from '../../../service/api/apiInstance';
import { USER_URL } from '../../../service/api/apiConfig';
const ResetPassword = () => {
  let { state } = useLocation()
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const { register, formState: { errors, isSubmitting }, watch, setValue, trigger, handleSubmit } = useForm({ defaultValues: { email: state?.email?.toLowerCase() }, mode: "onChange" });
  const navigate = useNavigate();

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword")
      console.log(trigger("confirmPassword"));
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
      const res = await axiosInstancePublic.post(USER_URL.RESET_PASSWORD, data)
      toastify('success', "Password Changed Successfully")
      navigate('/');
    } catch (error) {
      console.log(error);
      toastify('error', error?.response?.data?.message || `Faild to Change Password`)
    }
  }

  return (
    <>
      <div className='lh-1'>
        <h3 className="h5">Reset  Password</h3>
        <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">

        <div  className={`input-group ${errors?.email ? ' mb-1' : 'mb-3'}`}>
          <span className="input-group-text"><img src={emailIcon} alt="email icon" className="w-full" /></span>
          <div className="form-floating">
            <input disabled {...register('email', EMAIL_VALIDATION)}
              autoComplete="true" type="email" className="form-control" id="email" placeholder="Email" />
            <label htmlFor="email ">Enter your E-mail</label>
          </div>
        </div>
        {errors?.email && <div className="text-danger mb-3">{errors?.email?.message} </div>}

        <div className={`input-group ${errors.otp ? ' mb-1' : 'mb-3'}`}>
          <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
          <div className="form-floating position-relative">
            <input {...register('seed', OTP_VALIDATION)} autoComplete="true" type="text" className="form-control" id="otp" placeholder="OTP" />
            <label htmlFor="otp">OTP</label>
          </div>
        </div>
        {errors?.otp && <div className="text-danger mb-3">{errors?.otp?.message} </div>}

        <div className={`input-group ${errors?.password ? ' mb-1' : 'mb-3'}`}>
          <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
          <div className="form-floating position-relative">
            <input {...register('password', PASSWORD_VALIDATION)} autoComplete="true" type={showPass ? "text" : "password"} className="form-control" id="floatingInputGroup1" placeholder="Username" />
            <label htmlFor="floatingInputGroup1">Password </label>
            <button aria-label={showPass?"Hide password":"Show password"} onClick={handleShowPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-4 translate-middle-y'>
            <i className={`fa-solid ${showConfirmPass ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
            <span className="visually-hidden">{showPass?"Hide":"Show"}</span>
            </button>
          </div>
        </div>
        {errors?.password && <div className="text-danger mb-3">{errors?.password?.message} </div>}

        <div className={`input-group ${errors.confirmPassword ? ' mb-1' : 'mb-3'}`}>
          <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
          <div className="form-floating position-relative">
            <input {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })} autoComplete="true" type={showConfirmPass ? "text" : "password"} className="form-control" id="confirm-password" placeholder="Username" />
            <label htmlFor="confirm-password">Confirm Password </label>
            <button aria-label={showConfirmPass? "Hide password":"Show password"} onClick={handleConfirmPass} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-4 translate-middle-y'>
              {showConfirmPass ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash" aria-hidden="true"></i>}
              <span className="visually-hidden">{showConfirmPass?"Hide":"Show"}</span>
            </button>
          </div>
        </div>
        {errors?.confirmPassword && <div className="text-danger mb-3">{errors?.confirmPassword.message} </div>}

        <button disabled={isSubmitting} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
          {isSubmitting ? <i className='fa fa-spinner fa-spin'></i> : "Reset Password"}</button>

      </form>
    </>
  )
}

export default ResetPassword