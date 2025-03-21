import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ConfrimationAdd = ({ id,show,handleClose,handleAdd,title ,isloading}) => {
  
   
  const addItem = (id) => {
    console.log(id);
    handleAdd(id)
  }
    return (
      <>
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center p-4">
        <h5 className="mb-3">Add to Favorites</h5>
        <p>Are you sure you want to add this item to your favorites?</p>
      </Modal.Body>
      <Modal.Footer className="border-0 d-flex justify-content-center">
        <Button variant="secondary" onClick={handleClose} className="px-4">
          Close
        </Button>
        <Button variant="primary" onClick={()=>addItem(id)}>
          {isloading ? <i className="fa fa-spinner fa-spin"></i>: `Add this ${title}`}
          </Button>
      </Modal.Footer>
    </Modal>
   
       </>
  )
}

export default ConfrimationAdd