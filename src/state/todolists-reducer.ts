import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>;

type ActionsType = RemoveTodolistAT | AddTodolistAT
   | ChangeTodolistTitleAT
   | ChangeTodolistFilterAT
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
         return [{...action.todolist, filter: "all"}, ...state]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const {title, id} = action;
         return state.map(tl => tl.id === id ? {...tl, title} : tl);
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


// --------- thunks -----------

export const getTodolistsTC = () => {
   return (dispatch: Dispatch) => {
      todolistsAPI.getTodolists()
         .then(res => {
            dispatch(setTodolistsAC(res.data));
         });
   }
}

export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.createTodolist(title)
         .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
         })
   }
}

export const removeTodolistTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.deleteTodolist(todolistId)
         .then(res => {
            dispatch(removeTodolistAC(todolistId));
         })
   }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.updateTodolist(todolistId, title)
         .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title));
         })
   }
}