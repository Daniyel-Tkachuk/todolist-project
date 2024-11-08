import { useAppSelector } from "../../hooks"
import { selectIsLoggedIn } from "../../../features/auth/model/authSelectors"
import { Navigate, Outlet } from "react-router-dom"
import React from "react"
import { Path } from "common/route/path"

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const getJSX = () => {
    if (isLoggedIn) {
      return <Outlet />
    }
    return <Navigate to={Path.Login} />
  }

  return getJSX()
}
