import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/navLogo.svg'
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  const toggleSidebar=()=>{
    setCollapsed(prev=>!prev)
  }
  return (
    <div className='sidebar-container'>

      <Sidebar collapsed={collapsed}>
        <Menu >
          
          <MenuItem onClick={toggleSidebar} className='pt-5 sidebar-logo'  icon={<img   src={logo} alt=""  />}></MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Dashboard </MenuItem>
          <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/users" />}> User</MenuItem>
          <MenuItem icon={<i className='fa fa-table-cells-large'></i>} component={<Link to="/dashboard/recipies" />}> Recipies </MenuItem>
          <MenuItem icon={<i className='fa fa-table-list'></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
          <MenuItem onClick={handleLogout} icon={<i class="fa-solid fa-right-from-bracket"></i>}> Logout</MenuItem>

        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar

