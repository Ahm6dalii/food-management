import React, { useEffect, useRef, useState } from 'react'
import SubHeader from './../../shared/SubHeader/SubHeader';
import Header from './../../shared/Header/Header';
import logo from './../../../assets/recipe-img.png';
import NoData from '../../shared/NoData/NoData';
import ConfirmationDelete from '../../shared/ConfirmationDelete/ConfirmationDelete';
import { toastify } from '../../../service/toastifiy';
import LoadingScreen from '../../shared/LoadingScreen/LoadingScreen';
import CategoriesData from '../CategoriesData/CategoriesData';
import { axiosInstancePrivate } from '../../../service/api/apiInstance';
import { CATEGORY_URL } from '../../../service/api/apiConfig';
import Paginations from '../../shared/Pagination/Pagination';
import CategoryViewModal from '../CategoryViewModal';
const CategoriesList = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [seachValue,setSearchvalue]=useState('')
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});

  const catogeryId = useRef()
  const currentCatogery = useRef()
  const handleAddCategory = () => {
    setMode('Add')
    handleShow(true)
  }
  const handleUpdateCategory = (name) => {
    setMode('Update')
    currentCatogery.current = name
    handleShow(true)
  }

  const handleSearch = (e) => {
    setSearchvalue(e.target.value)
  }
  const handleViewCategory = (category) => {
    setCurrentCategory(category)
    setViewModalShow(true)
  }
  const getCategory = async (pageNumber = 1, pageSize=10,searchValue) => {
    setIsLoading(prev=>true)
    console.log(isLoading);
    
    try {
      const res = await axiosInstancePrivate.get(CATEGORY_URL.GET_CATOGERY,{
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          name:searchValue
        }
      });
      console.log(res?.data);
      console.log(isLoading,'after');
      setCategory(res?.data);
    } catch (error) {
      console.log(error);
    } finally { setIsLoading(false) }
  }
  useEffect(() => {
    console.log("Updated isLoading:", isLoading);
  }, [isLoading]);

  const deleteCategory = async () => {
    try {
      const res = await axiosInstancePrivate.delete(CATEGORY_URL.DELETE_CATOGERY(catogeryId.current));
      getCategory();
      toastify('success', 'Category deleted successfuly')
    } catch (error) {
      toastify('error', 'falid to delete!')
      console.log(error);
    }
  }

 
  
    useEffect(() => {
      getCategory(1,10,seachValue);
    }, [seachValue])
  

  return (
    <div className='overflow-hidden'>

      <Header title="Categories Items" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
      <SubHeader title="Categories Table Details" discribtion="You can check all details" btnName="Add New Category" handleBtnAction={handleAddCategory} />

      <div className='searchSection container-fluid my-3'>
        <div className="row">
          <div className="col-md-9 search-tag-box d-flex align-content-center gap-2">
            <div className="search-bar btn-group  w-75 ">
              <div className="input-group rounded  border-1 border ">
                <span className="input-group-text border-0  bg-transparent" id="search-addon">
                  <i className="fas fa-search"></i>
                </span>
                <input type="search" onChange={(e)=>{handleSearch(e)}} className="form-control border-0 rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              </div>
            </div>

           
          </div>

       
        </div>
      </div>

      <div className="container mt-4">
        <div className="table-responsive-lg">
          <table className="table table-striped  table-hover text-center align-middle overflow-x-auto">

            <thead className="table-secondary overflow-visible">
              <tr>
                <th scope="col" className="px-1 py-4 rounded-start-3 text-nowrap">Id</th>
                <th scope="col" className="px-1 py-4 ">Name</th>
                <th scope="col" className="px-1 py-4 ">Create at</th>
                <th scope="col" className="px-1 py-4 ">Action</th>
              </tr>
            </thead>

            <tbody>
              {category?.data?.length > 0 && !isLoading ? category?.data?.map((category) => (
                <tr key={category?.id}>
                  <td data-label="Item Name">{category?.id}</td>
                  <td data-label="Price">{category?.name} </td>
                  <td data-label="Create At" className="text-wrap">{new Date(category?.creationDate).toLocaleString()}</td>

                  <td data-label="Action" className='dropup-center dropup '>
                    <i className="fa fa-ellipsis text-secondary dropup-center dropup cursor-pointer " data-bs-toggle="dropdown" />
                    <ul className="dropdown-menu  z-3 position-absolute">
                      <li onClick={() => handleViewCategory(category)}><a className="dropdown-item d-flex align-content-center gap-2 cursor-pointer" ><i className='fa-solid fa-eye text-success'></i> View</a></li>
                      <li onClick={() => handleUpdateCategory(category)}><a className="dropdown-item cursor-pointer d-flex align-content-center gap-2"><i className="fa-solid fa-pen-to-square text-success"></i> Edit</a></li>
                      <li onClick={() => catogeryId.current = category?.id}><a className="dropdown-item  cursor-pointerd-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                    </ul>
                  </td>
                </tr>
              )) : (<tr >
                <td className='text-center' colSpan={7}>{isLoading? <LoadingScreen /> : <NoData />} </td>
              </tr>)}
            </tbody>

          </table>
          {category?.data?.length > 0 &&  <Paginations pageNumber={category?.pageNumber} pageSize={category?.pageSize} totalNumberOfPages={category?.totalNumberOfPages} totalNumberOfRecords={category?.totalNumberOfRecords
          } getNewPage={getCategory} /> }
         
        </div>
      </div>

      <ConfirmationDelete id={catogeryId?.current} handleDelete={deleteCategory} title={"Category"} />
      <CategoriesData getAllCategories={getCategory} show={show} handleClose={handleClose} mode={mode} value={currentCatogery.current} />
      <CategoryViewModal show={viewModalShow} onHide={() => setViewModalShow(false)} data={currentCategory} />
    </div>
  )
}

export default CategoriesList