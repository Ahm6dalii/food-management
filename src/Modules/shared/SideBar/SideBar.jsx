import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/navLogo.svg';
import ChangePassword from '../../Authentication/Change-password/ChangePassword';
import { axiosInstancePrivate } from '../../../service/api/apiInstance';

const SideBar = ({  getLoginData }) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleCloseChangePasswordModal = () => setShowChangePasswordModal(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

  const navigate = useNavigate();
  const pathName = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('decode');
    localStorage.removeItem('collapsed');
    delete axiosInstancePrivate.defaults.headers.Authorization
    navigate('/');
  };

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
    localStorage.setItem('collapsed', !collapsed);
  };

  // Define role-based navigation links
  const navLinks = [
    { title: 'Dashboard', icon: 'fa fa-home', link: '/dashboard', role: 'all' },
    { title: 'User', icon: 'fa fa-users', link: '/dashboard/users', role: 'SuperAdmin' },
    { title: 'Recipies', icon: 'fa fa-table-cells-large', link: '/dashboard/recipies', role: 'all' },
    { title: 'Categories', icon: 'fa fa-table-list', link: '/dashboard/categories', role: 'SuperAdmin' },
    { title: 'Favorites', icon: 'fa fa-heart', link: '/dashboard/favorites', role: 'SystemUser' }
  ];

  // Extract user role from loginData
  const userRole =  getLoginData()?.userGroup || 'SystemUser';
    

  // Filter navigation links based on the user's role
  const filteredNavLinks = navLinks.filter(link => link.role.toLocaleLowerCase() === 'all' || link.role.toLocaleLowerCase()  === userRole.toLocaleLowerCase() );

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const storedCollapsed = setCollapsed(JSON.parse(localStorage.getItem('collapsed')));
      
  if (storedCollapsed ===undefined || storedCollapsed === null) {    
    setCollapsed(screenWidth <768); 
  }
   
  }, []);


  return (
    <>
      <div className={`sidebar-container h-100`}>
        <Sidebar collapsed={collapsed} className='h-100'>
          <Menu>
            <MenuItem onClick={toggleSidebar} className='pt-5 ms-1 sidebar-logo' icon={<img src={logo} alt="" />} />
            
            {filteredNavLinks.map((link, index) => (
              <MenuItem
                className={`${pathName === link.link && !showChangePasswordModal ? "active" : ""}`}
                key={index}
                icon={<i className={link.icon}></i>}
                component={<Link to={link.link} />}
              >
                {link.title}
              </MenuItem>
            ))}

            {/* CHANGE PASSWORD MODAL */}
           {userRole === 'SuperAdmin' &&  <MenuItem className={`${showChangePasswordModal ? "active" : ""}`} icon={<i className='fa-solid fa-lock'></i>} onClick={handleShowChangePasswordModal}>
              Change Password
            </MenuItem>}

            {/* LOGOUT BUTTON */}
            <MenuItem className='mt-5' onClick={handleLogout} icon={<i className="fa-solid fa-right-from-bracket"></i>}>
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <ChangePassword show={showChangePasswordModal} handleClose={handleCloseChangePasswordModal} />
    </>
  );
};

export default SideBar;
