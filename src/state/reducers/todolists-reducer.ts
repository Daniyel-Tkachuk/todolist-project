import {RESULT_CODE, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): Array<TodolistDomainType> => {
   switch (action.type) {
      case 'SET-TODOLISTS': {
         return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
      }
      case 'REMOVE-TODOLIST': {
         return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
         return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const {title, id} = action;
         return state.map(tl => tl.id === id ? {...tl, title} : tl);
      }
      case 'CHANGE-TODOLIST-FILTER': {
         const {id, filter} = action;
         return state.map(tl => tl.id === id ? {...tl, filter} : tl);
      }
      case 'SET-ENTITY-STATUS': {
         const {todolistId, entityStatus} = action;
         return state.map(tl => tl.id === todolistId ? {...tl, entityStatus} : tl);
      }
      default:
         return state;
   }
}

// --------- actions -----------
export const removeTodolistAC = (todolistId: string) => {
   return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
}
export const addTodolistAC = (todolist: TodolistType) => {
   return {type: 'ADD-TODOLIST', todolist} as const;
}
export const changeTodolistTitleAC = (id: string, title: string) => {
   return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const;
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
   return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const;
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
   return {type: "SET-TODOLISTS", todolists} as const;
}
export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
   return {type: "SET-ENTITY-STATUS", todolistId, entityStatus} as const;
}


// --------- thunks -----------
export const getTodolistsTC = () => {
   return (dispatch: Dispatch) => {
      todolistsAPI.getTodolists()
         .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setStatusAC("succeeded"))
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error)
         })
   }
}
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"))
      todolistsAPI.createTodolist(title)
         .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
               dispatch(addTodolistAC(res.data.data.item))
               dispatch(setStatusAC("succeeded"))
            } else {
               handleServerAppError(dispatch, res.data);
            }
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error);
         })
   }
}
export const removeTodolistTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"))
      dispatch(setEntityStatusAC(todolistId, "loading"))

      todolistsAPI.deleteTodolist(todolistId)
         .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
               dispatch(removeTodolistAC(todolistId));
               dispatch(setStatusAC("succeeded"))
            } else {
               handleServerAppError(dispatch, res.data);
            }
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error);
            dispatch(setEntityStatusAC(todolistId, "idle"));
         })
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"))
      todolistsAPI.updateTodolist(todolistId, title)
         .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
               dispatch(changeTodolistTitleAC(todolistId, title));
               dispatch(setStatusAC("succeeded"))
            } else {
               handleServerAppError(dispatch, res.data);
            }
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error);
         })
   }
}

// --------- types -----------
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>;
export type SetEntityStatusAT = ReturnType<typeof setEntityStatusAC>;

type ActionsType = RemoveTodolistAT | AddTodolistAT
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | SetTodolistsAT | SetEntityStatusAT

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}