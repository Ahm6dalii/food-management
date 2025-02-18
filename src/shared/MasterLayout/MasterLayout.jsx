import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Header from '../Header/Header';
import Sidebar from './../Sidebar/Sidebar';

const MasterLayout = () => {
  return (
    <>
    <div className='d-flex'>
      <div className='w-25'>
        <Sidebar/>
      </div>
      <div className='w-75'>
        <Navbar/>
        <Header/>
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default MasterLayout