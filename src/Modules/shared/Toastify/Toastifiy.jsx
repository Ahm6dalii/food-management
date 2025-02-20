import React from 'react'
import { Flip, ToastContainer } from 'react-toastify'

 export const Toastifiy = () => {
  return (
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Flip}
    />
  )
}

export default Toastifiy