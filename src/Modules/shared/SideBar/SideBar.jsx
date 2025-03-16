import React, {  useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/navLogo.svg'
import ChangePassword from '../../Authentication/Change-password/ChangePassword';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleCloseChangePasswordModal = () => setShowChangePasswordModal(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

  const navigate = useNavigate();
  const pathName=location.pathname
  console.log(pathName);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  const toggleSidebar=()=>{
    setCollapsed(prev=>!prev)
    localStorage.setItem('collapsed',!collapsed)
  }

  const navLinks=[
    {
      title:'Dashboard',
      icon:'fa fa-home',
      link:'/dashboard'
    },
    {
      title:'User',
      icon:'fa fa-users',
      link:'/dashboard/users'
    },
    {
      title:'Recipies',
      icon:'fa fa-table-cells-large',
      link:'/dashboard/recipies'
    },
    {
      title:'Categories',
      icon:'fa fa-table-list',
      link:'/dashboard/categories'
    },
   
  ]

  useEffect(() => {
    setCollapsed(JSON.parse(localStorage.getItem('collapsed')))
  })
  return (
    <>
    <div className={`sidebar-container h-100 `} >

      <Sidebar collapsed={collapsed} className=' h-100' 	>
        <Menu >
          
          <MenuItem onClick={toggleSidebar} className='pt-5 ms-1 sidebar-logo '  icon={<img   src={logo} alt=""  />}></MenuItem>

          {navLinks.map((link,index)=>{
            return(
             <MenuItem  className={`${pathName==link.link && !showChangePasswordModal?"active":""}`} key={index} icon={<i className={link.icon}></i>} component={ <Link to={link.link} />} > {link.title} </MenuItem>
            )
          })}
           {/* CHANGE PASSWORD MODAL */}
          <MenuItem className={`${showChangePasswordModal?"active":""}`}  icon={<i className={'fa-solid fa-lock'}></i>}    onClick={handleShowChangePasswordModal} > Change Password </MenuItem>
           {/* LOGOUT BUTTION */}
          <MenuItem className='mt-5' onClick={handleLogout} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout</MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
    <ChangePassword show={showChangePasswordModal} handleClose={handleCloseChangePasswordModal}/>
    </>

  )
}

export default SideBar

