import React, { useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import SubHeader from '../../shared/SubHeader/SubHeader';
import RecipeForm from './component/RecipeForm';

const RecipeData = () => {
const { state} = useLocation()
const navigate = useNavigate();
const navigateToAllRecipes=()=>{
  navigate('/dashboard/recipies')
}

useEffect(() => {
  document.title = `Recipe List / ${state}`
}, [])
  return <>
  <SubHeader title={`${state==="Update"?"Edit":"Fill"} the Recipe`} recipes={true} discribtion="you can now fill the meals easily using the table and form , click here and sill it with the table !" btnName="All Recipes" handleBtnAction={ navigateToAllRecipes} />
  <RecipeForm mode={state}/>
  </>
}

export default RecipeData