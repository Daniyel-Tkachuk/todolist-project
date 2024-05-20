import {v1} from "uuid";


export type TodolistType = {
   id: string,
   title: string,
   filter: FilterValuesType
};
export type FilterValuesType = "all" | "active" | "completed";

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
   switch (action.type) {
      case "ADD_TODOLIST": {
         const newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: "all"};
         return [...state, newTodolist]
      }
      case "REMOVE_TODOLIST": {
         return state.filter(tl => tl.id !== action.payload.id);
      }
      case "UPDATE_TODOLIST": {
         const {id, title} = action.payload;
         return state.map(tl => tl.id === id ? {...tl, title} : tl);
      }
      default: {
         return state;
      }
   }
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
   return {
      type: "ADD_TODOLIST",
      payload: {
         title
      }
   } as const;
};

type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
   return {
      type: "REMOVE_TODOLIST",
      payload: {
         id
      }
   } as const;
};

type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>;
export const updateTodolistAC = (id: string, title: string) => {
   return {
      type: "UPDATE_TODOLIST",
      payload: {
         id,
         title
      }
   } as const;
}


type ActionsType = AddTodolistACType | removeTodolistACType | UpdateTodolistACType;