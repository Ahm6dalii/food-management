import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../../assets/logo/logo1.png'
const AuthLayout = () => {
  const pathName=location.pathname

  return (
    <>
      <div className={`authentication-container ${pathName!=='register'?' authentication-bg-img':""}`}>
        <div className="container-fluid overlay">
          <div className="row  min-vh-100 justify-content-center align-items-center">
            <div className="col-11 col-md-8 col-lg-6   bg-white rounded px-5 px-md-4 px-lg-5 py-4 ">
              <div className="logo text-center">
                <img src={logo} alt="logo" className="w-50" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout