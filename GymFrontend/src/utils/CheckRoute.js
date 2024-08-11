import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function CheckRoute() {

    const token = localStorage.getItem("token")

  return (
    token?.length > 0 ? <Navigate to="/home" /> : <Outlet />
  )
}

export default CheckRoute