import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = {
  redirectPath?: string
  condition: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  condition,
  redirectPath = '/',
}) => {
  return condition ? <Outlet /> : <Navigate to={redirectPath} replace />
}
