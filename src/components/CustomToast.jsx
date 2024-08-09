import React from 'react'
import { ToastContainer } from 'react-toastify'

function CustomToast() {
    return (
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={localStorage.getItem('theme')}
      />
    )
}

export default CustomToast