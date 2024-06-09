export type TodolistType = {
   id: string,
   title: string,
   filter: FilterValuesType
};
export type FilterValuesType = "all" | "active" | "completed";

const initialState: TodolistType[] = [];

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
   switch (action.type) {
      case "ADD_TODOLIST": {
         const {id, title} = action.payload;
         const newTodoTitle = title ? title : "";
         const newTodolist: TodolistType = {id, title: newTodoTitle, filter: "all"};
         return [newTodolist, ...state]
      }
      case "REMOVE_TODOLIST": {
         return state.filter(tl => tl.id !== action.payload.id);
      }
      case "UPDATE_TODOLIST_TITLE": {
         const {id, title} = action.payload;
         return state.map(tl => tl.id === id ? {...tl, title} : tl);
      }
      case "CHANGE_FILTER": {
         const {id, filter} = action.payload;
         return state.map(tl => tl.id === id ? {...tl, filter} : tl);
      }
      default: {
         return state;
      }
   }
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (id: string, title?: string) => {
   return {
      type: "ADD_TODOLIST",
      payload: {
         id,
         title
      }
   } as const;
};

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
   return {
      type: "REMOVE_TODOLIST",
      payload: {
         id
      }
   } as const;
};

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>;
export const updateTodolistTitleAC = (id: string, title: string) => {
   return {
      type: "UPDATE_TODOLIST_TITLE",
      payload: {
         id,
         title
      }
   } as const;
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
   return {
      type: "CHANGE_FILTER",
      payload: {
         id,
         filter
      }
   } as const;
}


export type ActionsType = AddTodolistACType | RemoveTodolistACType | UpdateTodolistTitleACType
   | ChangeFilterACType;