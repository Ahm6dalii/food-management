import React from 'react'

const Header = ({ title,discribtion ,logo}) => {
  return (
    <div className='container-fluid header-container px-5  py-3 rounded-3  '>
      <div className="row align-item-center w-100">
        <div className="col-md-8 flex align-content-center">
        <div className="caption  ">
            <h3>{title.split(" ").slice(0,1).join("")} <span className='fw-light text-light'>{title.split(" ").slice(1).join("")}</span></h3>
            <p className='w-75'>{discribtion}</p>
        </div>
        </div>
        <div className="col-md-4">
        <div className='img-container text-end'>
          <img src={logo} className='header-image  position-relative ' alt="header image" />
        </div>
        </div>
      </div>
    
    </div>
  )
}

export default Header