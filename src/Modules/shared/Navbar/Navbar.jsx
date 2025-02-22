import React from 'react'
import avatar from '../../../assets/avatar.png'
const Navbar = ({loginData}) => {
  console.log(loginData);

  return (
    <div className='pt-1 pb-3'>
      <nav className="navbar navbar-expand-sm bg-body-tertiary rounded-4">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  align-items-center gap-2">
              <span className='rounded-circle overflow-auto '><img className='w-100' src={avatar} alt="avatar" /></span>
              <li className="nav-item  ">
                <a className="nav-link active fw-semibold flex bg-body-tertiary" aria-current="page" >{loginData?.userEmail??"username"} <i className='fa fa-angle-down ms-5'></i></a>
              </li>
            </ul>
            <div className='ms-3 position-relative'>
            <i className="fa-solid fa-bell"></i>
            <span className='bill-notification'></span>
            </div>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar