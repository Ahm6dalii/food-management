import React, { useEffect, useRef, useState } from 'react'
import ConfirmationDelete from '../shared/ConfirmationDelete/ConfirmationDelete'
import { axiosInstancePrivate } from '../../service/api/apiInstance';
import { imageURL, USER_URL } from '../../service/api/apiConfig';
import Header from '../shared/Header/Header';
import SubHeader from '../shared/SubHeader/SubHeader';
import logo from './../../assets/recipe-img.png';
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';
import NoData from '../shared/NoData/NoData';
import noDataImg from './../../assets/nodata.png';
import { toastify } from '../../service/toastifiy';
import Paginations from '../shared/Pagination/Pagination';
import UserViewModal from './UserViewModal';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const[isLoading,setIsLoading]=useState(false)
     const [seachValue,setSearchvalue]=useState('')
     const [emailValue,setEmailvalue]=useState('')
     const [countryValue,setCountryvalue]=useState('')
      const [viewModalShow, setViewModalShow] = useState(false);
      const [currentUser, setCurrentUser] = useState({});
    const userId = useRef()

    const handleBtnAction=()=>{
      console.log('clicked');  
      
  }

   
    const getUsers = async (pageNumber=1,pageSize=10,userRole,searchValue,emailValue,countryValue) => {
      console.log(userRole,searchValue,emailValue,countryValue, pageNumber,pageSize);
      
      setIsLoading(true)
      try {
        const res = await axiosInstancePrivate.get(USER_URL.GET_USERS,{
          params:{
            pageNumber:pageNumber,
            pageSize:pageSize,
            groups:userRole,
            userName:searchValue,
            email:emailValue,  
            country:countryValue
          }
        });
        console.log(res?.data);
        setUsers(res?.data);
      } catch (error) {
        console.log(error||"Faild to get data");
      }finally{
        setIsLoading(false)
      }
    }
    

    
    const deleteUser = async () => {
      try {
        const res = await axiosInstancePrivate.delete(USER_URL.DELETE_USER(userId.current));
        console.log(res?.data);
        getUsers();
        toastify('success', 'User Deleted successfuly')
      } catch (error) {
        
        toastify('error', error?.response?.data?.message || 'falid to delete!')
        console.log(error);
      }
  
    }
    const handleNameSearch=(e)=>{
      setSearchvalue(e.target.value)
    }
    const handleEmailSearch=(e)=>{
      setEmailvalue(e.target.value)
    }
    const handleCountrySearch=(e)=>{
      setCountryvalue(e.target.value)
    }
    const handleUserRoleChange=(e)=>{
      setUserRole(e.target.value)
    }

    const handleViewUser=(user)=>{
      setCurrentUser(user)
      setViewModalShow(true)
    }
  
    useEffect(() => {
      // Change the title of the document
      document.title = 'Users List';
    }, [document.title]);

    useEffect(() => {
     getUsers(1,10,userRole,seachValue,emailValue,countryValue)
    }, [seachValue,countryValue,emailValue,userRole])
  

  return (
    <div className=''>

    <Header title="Users List" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
    <SubHeader title="User Table Details" discribtion="You can check all details" btnName="Add New Item"  />

    <div className='searchSection container-fluid my-3'>
      <div className="row">
        {/* Search bar */}
        <div className="col-md-3 search-tag-box d-flex align-content-center gap-2">
          <div className="search-bar btn-group  w-100">
            <div className="input-group rounded  border-1 border ">
              <span className="input-group-text border-0  bg-transparent" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
              <input type="text" onChange={handleNameSearch} className="form-control border-0 rounded" placeholder="UserName" aria-label="Search" aria-describedby="search-addon" />
              </div>
          </div>    
        </div>
        {/* Search bar */}
        <div className="col-md-3 search-tag-box d-flex align-content-center gap-2">
          <div className="search-bar btn-group  w-100">
            <div className="input-group rounded  border-1 border ">
              <span className="input-group-text border-0  bg-transparent" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
              <input type="email" onChange={handleEmailSearch} className="form-control border-0 rounded" placeholder="Email" aria-label="Enter Email"  />
              </div>
          </div>    
        </div>
        {/* Search bar */}
        <div className="col-md-3 search-tag-box d-flex align-content-center gap-2">
          <div className="search-bar btn-group  w-100">
            <div className="input-group rounded  border-1 border ">
              <span className="input-group-text border-0  bg-transparent" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
              <input type="text" onChange={handleCountrySearch} className="form-control border-0 rounded" placeholder="Country" aria-label="Enter Country"  />
              </div>
          </div>    
        </div>

       
      
        {/* Select Category */}
        <div className="col-md-3 select-category ">
          <select className="form-select" aria-label="Default select example" onChange={handleUserRoleChange}>
            <option selected value=''>User Role</option>
            <option value="1">Admin</option>
            <option value="2">system user</option>
          </select>
        </div>

        

      </div>
    </div>

    <div className="container-fluid mt-4">
<div className="overflow-x-auto">
        <table className="table table-striped table-hover text-center align-middle " >

          <thead className="table-secondary  overflow-visible">
            <tr>
              <th scope="col" className="px-1 py-4 rounded-start-3 ">ID</th>
              <th scope="col" className="px-1 py-4  text-nowrap">user Name</th>
              <th scope="col" className="px-1 py-4 ">Email</th>
              <th scope="col" className="px-1 py-4 ">image</th>
              <th scope="col" className="px-1 py-4 ">Country</th>
              <th scope="col" className="px-1 py-4 ">Number</th>
              <th scope="col" className="px-1 py-4 ">Role</th>
              <th scope="col" className="px-1 py-4 ">Create At</th>
              <th scope="col" className="px-1 py-4 rounded-end-3">Actions</th>
            </tr>
          </thead>

          <tbody>
       
            {users?.data?.length > 0 &&!isLoading ? users?.data?.map((user) => (
              <tr key={user?.id}>
                <td data-label="user id">{user?.id}</td>
                <td data-label="user name">{user?.userName} </td>
                <td data-label="email" className="text-wrap">{user?.email}</td>
                <td data-label="Image"><img src={` ${user?.imagePath? imageURL+user?.imagePath:noDataImg}`} loading='lazy' alt="Food Image" className="img-fluid rounded w-100 d-block" style={{ maxWidth: 80 }} /></td>
                <td data-label="country">{user?.country}</td>
                <td data-label="phone number">{user?.phoneNumber}</td>
                <td data-label="Role">{user?.group["name"]}</td>
                <td data-label="Create At" className="text-wrap">{new Date(user?.creationDate).toLocaleString()}</td>
                <td data-label="Action" className='dropup-center dropup'>
                  <i className="fa fa-ellipsis text-secondary dropup-center dropup cursor-pointer" data-bs-toggle="dropdown" />
                  <ul className="dropdown-menu">
                    <li onClick={() =>handleViewUser(user)}><a className="dropdown-item d-flex align-content-center gap-2 cursor-pointer" ><i className='fa-solid fa-eye text-success'></i> View</a></li>
                    <li onClick={() => userId.current = user?.id}><a className="dropdown-item cursor-pointer d-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                  </ul>
                </td>
              </tr>
            )) : (<tr >
              <td className='text-center ' colSpan={8}>{isLoading?<LoadingScreen/>:<NoData />}</td>
            </tr>)}
          </tbody>
        </table>
</div>

              {users?.data?.length > 0 &&  <Paginations pageNumber={users?.pageNumber} pageSize={users?.pageSize} totalNumberOfPages={users?.totalNumberOfPages} totalNumberOfRecords={users?.totalNumberOfRecords} getNewPage={getUsers} />}
      

      <ConfirmationDelete id={userId?.current} handleDelete={deleteUser} title={"User"} />
      <UserViewModal   show={viewModalShow} onHide={() => setViewModalShow(false)} data={currentUser}/>

    </div>

  </div>
  )
}

export default Users