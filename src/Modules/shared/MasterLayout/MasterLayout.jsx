import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

const MasterLayout = ({loginData}) => {
  return (
    <>
    <div className='d-flex'>
      <div className=' '>
        <SideBar/>
      </div>
      <div className='w-100 px-sm-4 overflow-hidden '>
        <Navbar loginData={loginData}/>
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MasterLayout