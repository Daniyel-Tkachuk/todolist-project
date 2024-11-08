import { RouteObject } from "react-router-dom"
import { Login } from "../../../features/auth/ui/Login/Login"
import { Page404 } from "../../components"
import React from "react"
import { Path } from "common/route/path"

export const publicRoutes: RouteObject[] = [
  {
    path: Path.Login,
    element: <Login />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]
