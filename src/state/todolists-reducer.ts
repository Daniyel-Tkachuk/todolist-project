import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST',
   id: string
}
export type AddTodolistActionType = {
   type: 'ADD-TODOLIST',
   title: string
   todolistId: string
}
export type ChangeTodolistTitleActionType = {
   type: 'CHANGE-TODOLIST-TITLE',
   id: string
   title: string
}
export type ChangeTodolistFilterActionType = {
   type: 'CHANGE-TODOLIST-FILTER',
   id: string
   filter: FilterValuesType
}

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>;

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsAT

const initialState: Array<TodolistDomainType> = [
   /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
   switch (action.type) {
      case 'SET-TODOLISTS': {
         return action.todolists.map(tl => {
            return {
               ...tl,
               filter: "all"
            }
         })
      }
      case 'REMOVE-TODOLIST': {
         return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
         return [{
            id: action.todolistId,
            title: action.title,
            filter: 'all',
            addedDate: '',
            order: 0
         }, ...state]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const todolist = state.find(tl => tl.id === action.id);
         if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = action.title;
         }
         return [...state]
      }
      case 'CHANGE-TODOLIST-FILTER': {
         const todolist = state.find(tl => tl.id === action.id);
         if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.filter = action.filter;
         }
         return [...state]
      }
      default:
         return state;
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
   return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
   return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
   return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
   return {type: "SET-TODOLISTS", todolists} as const
}


// --------- thunks -----------

export const getTodolistsTC = () => {
   return (dispatch: Dispatch) => {
      todolistsAPI.getTodolists()
         .then(res => {
            dispatch(setTodolistsAC(res.data));
         });
   }
}