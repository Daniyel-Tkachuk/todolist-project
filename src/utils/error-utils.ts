import {setAppErrorAC, SetAppErrorAT, setStatusAC, SetStatusAT} from "../state/reducers/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


// утилита для обработки ошибок КЛИЕНТА - БРАУЗЕРА
export const handleServerAppError = <D>(dispatch: ErrorUtilsDispatchType, data: ResponseType<D>) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]));
   } else {
      dispatch(setAppErrorAC("Some Error 😝"));
   }
   dispatch(setStatusAC("failed"));
}


// утилита для обработки ошибок СЕРВЕРА
export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: {message: string}) => {
   dispatch(setAppErrorAC(error.message));
   dispatch(setStatusAC("failed"));
}


// ---------------- types -----------------------
type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT | SetStatusAT>;