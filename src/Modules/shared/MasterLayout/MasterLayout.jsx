import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import SideBar from './../SideBar/SideBar';

const MasterLayout = ({loginData}) => {
  return (
    <>
    <div className='d-flex'>
      <div className=''>
        <SideBar/>
      </div>
      <div className='w-100 px-4 '>
        <Navbar loginData={loginData}/>
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MasterLayout