import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/navLogo.svg'
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const pathName=location.pathname
  console.log(pathName);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  const toggleSidebar=()=>{
    setCollapsed(prev=>!prev)
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
  return (
    <div className='sidebar-container' >

      <Sidebar collapsed={collapsed} 	>
        <Menu >
          
          <MenuItem onClick={toggleSidebar} className='pt-5 sidebar-logo'  icon={<img   src={logo} alt=""  />}></MenuItem>

          {navLinks.map((link,index)=>{
            return(
              <MenuItem className={`${pathName==link.link?"active":""}`} key={index} icon={<i className={link.icon}></i>} component={<Link to={link.link} />} > {link.title} </MenuItem>
            )
          })}
          <MenuItem onClick={handleLogout} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout</MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar

