import React, { useEffect, useState } from 'react'
import SubHeader from './../../shared/SubHeader/SubHeader';
import Header from './../../shared/Header/Header';
import logo from './../../../assets/recipe-img.png';
import axios from 'axios';
import { api } from './../../../Utils/Api';
import NoData from '../../shared/NoData/NoData';
import ConfirmationDelete from '../../shared/ConfirmationDelete/ConfirmationDelete';
import { toastify } from '../../../Utils/toastifiy';
export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');

  const getRecipes = async () => {
    try {
      const res = await axios.get(`${api}/api/v1/Recipe/?pageSize=10&pageNumber=1`);
      console.log(res.data);
      setRecipes(res.data.data);
    } catch (error) {

    } finally {

    }
  }


  const deleteRecipes = async () => {
    try {
      const res = await axios.delete(`${api}/api/v1/Recipe/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      console.log(res.data);
      getRecipes();
      toastify('success','Reciepe Deleted successfuly')
    } catch (error) {
      toastify('error','falid to delete!')
      console.log(error);
    } 
    
  }

  useEffect(() => {
    getRecipes();
  }, [])
  return (
    <div className='overflow-hidden'>
      <Header title="Recipes Items" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
      <SubHeader title="Recipe Table Details" discribtion="You can check all details" btnName="Add New Item" handleBtnAction="" />
      <div className='searchSection container-fluid my-3'>
        <div className="row">
          <div className="col-md-9 search-tag-box d-flex align-content-center gap-2">
            <div className="search-bar btn-group  w-75 ">
              <div className="input-group rounded  border-1 border ">
                <span className="input-group-text border-0  bg-transparent" id="search-addon">
                  <i className="fas fa-search"></i>
                </span>
                <input type="search" className="form-control border-0 rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              </div>
            </div>

            <div className="select-tag w-25">
              <select className="form-select" aria-label="Default select example">
                <option selected value='tags'>Tags</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div className="col-md-2 select-category ">
            <select className="form-select" aria-label="Default select example">
              <option selected value='d'>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-secondary">
              <tr>
                <th scope="col" className="px-1 py-4 rounded-start-3 text-nowrap">Item Name</th>
                <th scope="col" className="px-1 py-4 ">Image</th>
                <th scope="col" className="px-1 py-4 ">Price</th>
                <th scope="col" className="px-1 py-4 ">Description</th>
                <th scope="col" className="px-1 py-4 ">Tag</th>
                <th scope="col" className="px-1 py-4 ">Category</th>
                <th scope="col" className="px-1 py-4 rounded-end-3">s</th>
              </tr>
            </thead>
            <tbody>
              {recipes.length > 0 ? recipes.map((recipe) => (
                <tr key={recipe?.id}>
                  <td data-label="Item Name">{recipe?.name}</td>
                  <td data-label="Image"><img src={`${api}/${recipe?.imagePath}`} alt="Food Image" className="img-fluid rounded w-100 d-block" style={{ maxWidth: 80 }} /></td>
                  <td data-label="Price">{recipe?.price} $</td>
                  <td data-label="Description" className="text-wrap">{recipe?.description}</td>
                  <td data-label="Tag">{recipe?.tag?.name}</td>
                  <td data-label="Category">{recipe?.category[0].name}</td>
                  <td data-label="Action" className='dropup-center dropup'>
                    <i className="fa fa-ellipsis text-secondary dropup-center dropup" data-bs-toggle="dropdown" />
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item d-flex align-content-center gap-2" href="#"><i className='fa-solid fa-eye text-success'></i> View</a></li>
                      <li><a className="dropdown-item d-flex align-content-center gap-2" href="#"><i className="fa-solid fa-pen-to-square text-success"></i> Edit</a></li>
                      <li onClick={()=>setId(recipe?.id)}><a className="dropdown-item d-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                    </ul>
                  </td>
                </tr>
              )) : (<tr >
                 <td className='text-center' colSpan={7}><NoData /></td>
                 </tr>)}
            </tbody>
          </table>
        </div>
        <ConfirmationDelete id={id} handleDelete={deleteRecipes}/>

      </div>




    </div>
  )
}
