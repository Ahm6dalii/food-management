import React from 'react'
import { Outlet, ScrollRestoration 	} from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';

const MasterLayout = ({loginData,getLoginData}) => {
  
  
  return (
    <>
    <div className='d-flex'>
      <div >
        <SideBar getLoginData={getLoginData}  />
      </div>
      <div className='w-100 px-sm-4 overflow-hidden '>
        <Navbar  getLoginData={getLoginData}/>
        <ScrollRestoration/> 
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MasterLayout