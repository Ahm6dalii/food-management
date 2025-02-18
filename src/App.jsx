import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './shared/AuthLayout/AuthLayout'
import Login from './Authentication/Login/Login';
import Register from './Authentication/Register/Register';
import ResetPass from './Authentication/Reset-pass/ResetPass';
import MasterLayout from './shared/MasterLayout/MasterLayout';
import CategoriesList from './Categories/CategoriesList/CategoriesList';
import CategoriesData from './Categories/CategoriesData/CategoriesData';
import { RecipeList } from './Recpies/RecipeList/RecipeList';
import RecipeData from './Recpies/RecipeData/RecipeData';
import NotFound from './shared/NotFound/NotFound';
import FogetPass from './Authentication/Forget-pass/FogetPass';
import Dashboard from './Dashboard/Dashboard';
import Toastifiy from './shared/Toastify/Toastifiy';
import VerifyAccount from './Authentication/Verify-account/VerifyAccount';

function App() {
const router=createBrowserRouter([
  {patth:'/',element:<AuthLayout/>,errorElement:<NotFound/>,children:[
    {index:true,element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'forget-pass',element:<FogetPass/>},
    {path:'reset-pass',element:<ResetPass/>},
    {path:'verify-account',element:<VerifyAccount/>},
  ]},
  {path:'/dashboard',element:<MasterLayout/>,errorElement:<NotFound/>,children:[
    {index:true,element:<Dashboard/>},
    {path:'categories-list',element:<CategoriesList/>},
    {path:'categories-data',element:<CategoriesData/>},
    {path:'recipies-list',element:<RecipeList/>},
    {path:'recipies-data',element:<RecipeData/>},
  ]}
])
  return (
    <>
       <Toastifiy/>
      <RouterProvider router={router}>      </RouterProvider>
    </>
  )
}

export default App