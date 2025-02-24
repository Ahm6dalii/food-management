import React from 'react'
import logo from './../../../assets/nodata.png';
const ConfirmationDelete = ({ id, handleDelete }) => {
  const deleteItem = () => {
    console.log(id);
    handleDelete(id)
  }
  return (
    <>
      <div>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="d-flex justify-content-end p-3">
                <button type="button" className=" bg-bg-transparent  rounded-circle border-danger border-2 border" data-bs-dismiss="modal" aria-label="Close" ><i className="fa-solid fa-x text-danger"></i></button>
              </div>
              <div className=" d-flex flex-column align-items-center justify-items-center py-2">
                <div className=''>
                  <img src={logo} className='w-75 mx-auto d-block' alt="" />
                </div>
                <h5 className='w-100 pt-3 text-center'>No Data !</h5>
                <p className='text-muted w-75 px-3 text-center'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
              </div>
              <div className="d-flex justify-content-end p-3">
                <button type="button" data-bs-dismiss="modal" onClick={deleteItem} className="btn btn-outline-danger">Delete this item</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ConfirmationDelete