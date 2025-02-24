import React from 'react'
import logo from './../../assets/welcomeImg.png'
import Header from './../shared/Header/Header';
import SubHeader from '../shared/SubHeader/SubHeader';
const Dashboard = () => {
  const handleBtnAction=()=>{
      console.log('clicked');  
  }
  
  return (
    <div>
     <Header title="Welcome Upskilling !" discribtion="This is a welcoming screen for the entry of the application , you can now see the options" logo={logo} />
     <SubHeader title="Fill the Recipes !" discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !" btnName="Fill Recipes" handleBtnAction={handleBtnAction} recipes='true' />
    </div>
  )
}

export default Dashboard