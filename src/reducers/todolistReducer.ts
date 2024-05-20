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
      default: {
         return state;
      }
   }
}

type AddTodolistACType = ReturnType<typeof AddTodolistAC>;
export const AddTodolistAC = (title: string) => {
   return {
      type: "ADD_TODOLIST",
      payload: {
         title
      }
   } as const;
}


type ActionsType = AddTodolistACType;