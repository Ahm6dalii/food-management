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

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const[isLoading,setIsLoading]=useState(false)
    const userId = useRef()

    const handleBtnAction=()=>{
      console.log('clicked');  
      
  }

  const handleUserRoleChange=(e)=>{
    setUserRole(e.target.value)
  }
    const getUsers = async () => {
      setIsLoading(true)
      try {
        const res = await axiosInstancePrivate.get(USER_URL.GET_USERS(10,1,userRole));
        console.log(res?.data?.data);
        setUsers(res?.data?.data);
      } catch (error) {
        setUsers([]);
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
  
    useEffect(() => {
      getUsers();
    }, [])
  
    useEffect(() => {
      getUsers();
    }, [userRole])
  

  return (
    <div className=''>

    <Header title="Users List" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
    <SubHeader title="User Table Details" discribtion="You can check all details" btnName="Add New Item"  />

    <div className='searchSection container-fluid my-3'>
      <div className="row">
        {/* Search bar */}
        <div className="col-md-8 search-tag-box d-flex align-content-center gap-2">
          <div className="search-bar btn-group  w-100">
            <div className="input-group rounded  border-1 border ">
              <span className="input-group-text border-0  bg-transparent" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
              <input type="search" className="form-control border-0 rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            </div>
          </div>

        </div>

        {/* Select Category */}
        <div className="col-md-3 select-category ">
          <select className="form-select" aria-label="Default select example" onChange={handleUserRoleChange}>
            <option selected value='d'>User Role</option>
            <option value="1">Admin</option>
            <option value="2">system user</option>
          </select>
        </div>

      </div>
    </div>

    <div className="container mt-4">

      <div className="table-responsive-lg" >
        <table className="table table-striped table-hover text-center align-middle overflow-x-auto" >

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
       
            {users?.length > 0 ? users?.map((user) => (
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
                    <li><a className="dropdown-item d-flex align-content-center gap-2 cursor-pointer" href="#"><i className='fa-solid fa-eye text-success'></i> View</a></li>
                    <li onClick={() => userId.current = user?.id}><a className="dropdown-item cursor-pointer d-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#"><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                  </ul>
                </td>
              </tr>
            )) : (<tr >
              <td className='text-center ' colSpan={7}>{isLoading?<LoadingScreen/>:<NoData />}</td>
            </tr>)}
          </tbody>

        </table>
      </div>

      <ConfirmationDelete id={userId?.current} handleDelete={deleteUser} title={"User"} />

    </div>

  </div>
  )
}

export default Users