import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {

    const token = localStorage.getItem("token")

  return (

    token?.length > 0 ? children : <Navigate to="/auth" />

  )
}

export default PrivateRoutes