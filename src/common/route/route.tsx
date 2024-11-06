import { createBrowserRouter } from "react-router-dom"
import { App } from "../../app/App"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"

export const Path = {
  Main: "/",
  Login: "login",
} as const

export const route = createBrowserRouter([
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
        path: "*",
        element: <Page404 />,
      },
    ],
  },
])
