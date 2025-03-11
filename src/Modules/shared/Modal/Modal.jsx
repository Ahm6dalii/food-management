import React, { useState } from 'react'
import ChangePassword from './../../Authentication/Change-password/ChangePassword';

const Modal = ({children}) => {
    // console.log(children,'sddsd');
    const[isModalClose,setIsModalClosed]=useState(false)
  return (
    <div >
           <div className="modal fade" id="Modal2" tabIndex={-1} aria-labelledby="exampleModalLabel"  onClick={()=>setIsModalClosed(prev=>true)} >
              <div className="modal-dialog" onClick={(e) => e.stopPropagation()} >
                <div className="modal-content py-4 px-5" >
                 <ChangePassword isModalClose={isModalClose} setIsModalClosed={setIsModalClosed} />
                </div>
              </div>
            </div>
    </div>
  )
}

export default Modal