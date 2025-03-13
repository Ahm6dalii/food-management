import React, {  useEffect, useState } from 'react'
import passIcon from '../../../assets/icons/lock.svg'
import {  useForm } from 'react-hook-form'
import { PASSWORD_VALIDATION } from '../../../service/validation'
import { toastify } from './../../../service/toastifiy';
import logo from '../../../assets/logo/logo1.png'
import Modal from 'react-bootstrap/Modal';
import { axiosInstancePrivate } from '../../../service/api/apiInstance';
import { USER_URL } from '../../../service/api/apiConfig';

const ChangePassword = ({ show,handleClose}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [title, setTitle] = useState('')

  const { register, formState: { errors, isSubmitting }, handleSubmit, watch, reset } = useForm({ mode: "onChange" });

  const newPasswordWatch = watch("newPassword");

  const handleShowOldPassword = () => {
    setShowOldPassword(prev => !prev)
  }
  const handleShowNewPassword = () => {
    setShowNewPassword(prev => !prev)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstancePrivate.put(USER_URL.CHANGE_PASSWORD, data)
      toastify('success', "Password Changed Successfuly")
      reset()
      handleClose()
    } catch (error) {
      console.log(error);
      toastify('error', error?.response?.data?.message || "Faild to Send")
    }
  }
  
   
      useEffect(() => {
        // Change the title of the document
        if(show){
          setTitle(document.title) 
          document.title = "Change Password";
        }else{     
          document.title =title;
        }
       
      }, [show]);

  return (
    <div>
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header className='border-0'>
          <div className="logo text-center mb-2">
            <img src={logo} alt="logo" className="w-50" />
          </div>

        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Change Your Password</h4>
            <p className='text-muted'>Enter your details below</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">


            <div className="input-group mb-2 ">
              <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
              <div className="form-floating position-relative">
                <input {...register('oldPassword', PASSWORD_VALIDATION)} autoComplete="true" type={showOldPassword ? "text" : "password"} className="form-control"  placeholder="Old Password " />
                <label htmlFor="floatingInputGroup1">Old Password </label>
                <button onClick={handleShowOldPassword} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-2 translate-middle-y'>
                  {showOldPassword ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash "></i>}
                </button>
              </div>
            </div>
            {errors?.oldPassword && <div className="text-danger mb-3">{errors?.oldPassword?.message} </div>}

            <div className="input-group mb-2 ">
              <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
              <div className="form-floating position-relative">
                <input {...register('newPassword', PASSWORD_VALIDATION)} autoComplete="true" type={showNewPassword ? "text" : "password"} className="form-control"  placeholder="New Password" />
                <label htmlFor="floatingInputGroup1">New Password </label>
                <button onClick={handleShowNewPassword} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-2 translate-middle-y'>
                  {showNewPassword ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash "></i>}
                </button>
              </div>
            </div>
            {errors?.newPassword && <div className="text-danger mb-3">{errors?.newPassword?.message} </div>}

            <div className="input-group mb-4 ">
              <span className="input-group-text"><img src={passIcon} alt="pass icon" className="w-full" /></span>
              <div className="form-floating position-relative">
                <input {...register('confirmNewPassword', { required: "Password is Required", validate: (value) => value === newPasswordWatch || "Pasword Not Matched" })} autoComplete="true" type={showConfirmPassword ? "text" : "password"} className="form-control"  placeholder="Confrim New Password" />
                <label htmlFor="floatingInputGroup1">Confirm New Password </label>
                <button onClick={handleShowConfirmPassword} type='button' className='position-absolute bg-transparent border-0 text-secondary top-50 end-0 me-2 translate-middle-y'>
                  {showConfirmPassword ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash "></i>}
                </button>
              </div>
            </div>
            {errors?.confirmNewPassword && <div className="text-danger mb-3">{errors?.confirmNewPassword?.message} </div>}



            <button disabled={isSubmitting} type='submit' className="btn btn-main w-full d-block w-100 fw-semibold">
              {isSubmitting ? <i className='fa fa-spinner fa-spin'></i> : "Change Password"}</button>

          </form>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default ChangePassword