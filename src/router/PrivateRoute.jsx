import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthenticationContext'


function PrivateRoute() {
    const user = useAuth()
    if(!user?.user) return Navigate('/')
  return (
    <Outlet />
  )
}

export default PrivateRoute