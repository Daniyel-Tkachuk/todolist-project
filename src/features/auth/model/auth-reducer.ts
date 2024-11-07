import { Dispatch } from "redux"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { LoginArgs } from "../api/authApi.types"

type InitialStateType = typeof initialState

const initialState = {
  isInitialized: false,
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
    case "AUTH/SET_SET_IS_INITIALIZED": {
      return {
        ...state,
        isInitialized: action.payload.isInitialized,
      }
    }
    default: {
      return state
    }
  }
}

// Actions
const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "AUTH/SET_SET_IS_INITIALIZED",
    payload: {
      isInitialized,
    },
  } as const
}

const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: "AUTH/SET_IS_LOGGED_IN",
    payload: {
      isLoggedIn,
    },
  } as const
}
// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// Thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}

export const loginTC = (arg: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
