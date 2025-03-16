import React from 'react'
import { Outlet, ScrollRestoration 	} from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import SideBar from '../SidBbar/SideBar';

const MasterLayout = ({loginData}) => {
  
  
  return (
    <>
    <div className='d-flex'>
      <div >
        <SideBar />
      </div>
      <div className='w-100 px-sm-4 overflow-hidden '>
        <Navbar loginData={loginData}/>
        <ScrollRestoration/> 
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MasterLayout