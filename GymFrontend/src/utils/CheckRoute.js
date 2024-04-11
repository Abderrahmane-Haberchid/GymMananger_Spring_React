import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function CheckRoute() {

    const token = localStorage.getItem("token")

  return (
    token !== "" ? <Navigate to="/home" /> : <Outlet />
  )
}

export default CheckRoute