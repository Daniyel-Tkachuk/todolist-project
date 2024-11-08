import React from "react"
import { createBrowserRouter } from "react-router-dom"
import { App } from "../../app/App"
import { ProtectedRoute } from "common/components/ProtectedRoutes/ProtectedRoutes"
import { privateRoutes } from "common/route/privateRoutes/privateRoutes"
import { publicRoutes } from "common/route/publicRoutes/publickRoutes"
import { Path } from "common/route/path"

export const route = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

/*export const route = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    children: [
      {
        path: Path.Main,
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: Path.Faq,
        element: <FaqPage />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
])*/
