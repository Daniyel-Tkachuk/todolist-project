import { RouteObject } from "react-router-dom"
import { FaqPage } from "../../../features/faq/ui/FaqPage/FaqPage"
import { Main } from "../../../app/Main"
import React from "react"
import { Path } from "common/route/path"

export const privateRoutes: RouteObject[] = [
  {
    path: Path.Faq,
    element: <FaqPage />,
  },
  {
    path: Path.Main,
    element: <Main />,
  },
]
