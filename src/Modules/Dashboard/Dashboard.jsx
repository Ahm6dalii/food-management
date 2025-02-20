import React from 'react'
import logo from './../../assets/welcomeImg.png'
import Header from './../shared/Header/Header';
const Dashboard = () => {
  return (
    <div>
     <Header title="Welcome Upskilling !" discribtion="This is a welcoming screen for the entry of the application , you can now see the options" logo={logo} />
      
    </div>
  )
}

export default Dashboard