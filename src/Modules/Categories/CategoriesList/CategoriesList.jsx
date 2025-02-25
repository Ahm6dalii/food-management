import React, { useEffect, useRef, useState } from 'react'
import SubHeader from './../../shared/SubHeader/SubHeader';
import Header from './../../shared/Header/Header';
import logo from './../../../assets/recipe-img.png';
import NoData from '../../shared/NoData/NoData';
import ConfirmationDelete from '../../shared/ConfirmationDelete/ConfirmationDelete';
import { axiosInstancePrivate, CATEGORY_URL } from '../../../service/ulrs/urls';
import { toastify } from '../../../service/toastifiy';
const CategoriesList = () => {
    const [category, setCategory] = useState([]);
    const catogeryId=useRef()
    const handleBtnAction=()=>{

    }

    const getCategory = async () => {
      try {
        const res = await axiosInstancePrivate.get(CATEGORY_URL.GET_CATOGERY);
        console.log(res?.data);
        setCategory(res?.data?.data);
        
      } catch (error) {
          console.log(error);
          
      } 
    }
  
    const deleteCategory = async () => {   
      try {
        const res = await axiosInstancePrivate.delete( CATEGORY_URL.DELETE_CATOGERY(catogeryId.current));
        getCategory();
        toastify('success','Category deleted successfuly')
      } catch (error) {
        toastify('error','falid to delete!')
        console.log(error);
      } 
    }

    useEffect(() => {
      getCategory();
    }, [])

  return (
  <div className='overflow-hidden'>

    <Header title="Categories Items" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
    <SubHeader title="Categories Table Details" discribtion="You can check all details" btnName="Add New Category" handleBtnAction={handleBtnAction} />
    
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
        <table className="table table-striped  table-hover text-center align-middle">

          <thead className="table-secondary overflow-visible">
            <tr>
              <th scope="col" className="px-1 py-4 rounded-start-3 text-nowrap">Id</th>
              <th scope="col" className="px-1 py-4 ">Name</th>
              <th scope="col" className="px-1 py-4 ">Create at</th>
              <th scope="col" className="px-1 py-4 ">Action</th>
            </tr>
          </thead>

          <tbody>     
            {category?.length > 0 ? category.map((category) => (
              <tr key={category?.id}>
                <td data-label="Item Name">{category?.id}</td>
                <td data-label="Price">{category?.name} </td>
                <td data-label="Description" className="text-wrap">{new Date(category?.creationDate).toLocaleString()}</td>

                <td data-label="Action" className='dropup-center dropup z-3'>
                  <i className="fa fa-ellipsis text-secondary dropup-center dropup " data-bs-toggle="dropdown" />
                  <ul className="dropdown-menu  z-3 position-absolute">
                    <li><a className="dropdown-item d-flex align-content-center gap-2" href="#"><i className='fa-solid fa-eye text-success'></i> View</a></li>
                    <li><a className="dropdown-item d-flex align-content-center gap-2" href="#"><i className="fa-solid fa-pen-to-square text-success"></i> Edit</a></li>
                    <li onClick={()=>catogeryId.current=category?.id}><a className="dropdown-item d-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                  </ul>
                </td>
              </tr>
            )) : (<tr > 
              <td className='text-center' colSpan={7}><NoData /></td>
              </tr>)}
          </tbody>

        </table>
      </div>
    </div>

    <ConfirmationDelete id={catogeryId?.current} handleDelete={deleteCategory}/>

  </div>
  )
}

export default CategoriesList