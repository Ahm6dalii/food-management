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
            <div className="col-sm-10 col-md-7 bg-white rounded px-5 py-5 ">
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