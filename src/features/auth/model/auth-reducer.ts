import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../../app/app-reducer"
import { Inputs } from "../ui/Login/Login"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { isAxiosError } from "axios"
import { Simulate } from "react-dom/test-utils"
import error = Simulate.error

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET_IS_LOGGED_IN": {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      }
    }
    default: {
      return state
    }
  }
}

// Actions
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: "AUTH/SET_IS_LOGGED_IN",
    payload: {
      isLoggedIn,
    },
  } as const
}
// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// Thunks
export const loginTC = (arg: Inputs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  return authApi
    .login(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
