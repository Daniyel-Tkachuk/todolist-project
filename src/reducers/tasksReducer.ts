import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolistsReducer";

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type TasksStateType = {
   [key: string]: TaskType[]
};

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case "REMOVE_TASK": {
         const {todoId, id} = action.payload;
         return {
            ...state,
            [todoId]: state[todoId].filter(t => t.id !== id)
         }

      }
      case "ADD_TASK": {
         const {todoId, title} = action.payload;
         return {
            ...state,
            [todoId]: [{id: v1(), title, isDone: false}, ...state[todoId]]
         }
      }
      case "CHANGE_TASK_STATUS": {
         const {todoId, id, isDone} = action.payload;
         return {
            ...state,
            [todoId]: state[todoId].map(t => t.id === id ? {...t, isDone} : t)
         }
      }
      case "UPDATE_TASK_TITLE": {
         const {todoId, id, title} = action.payload;
         return {
            ...state,
            [todoId]: state[todoId].map(t => t.id === id ? {...t, title} : t)
         }
      }
      case "ADD_TODOLIST": {
         return {
            ...state,
            [action.payload.id]: []
         }
      }
      case "REMOVE_TODOLIST": {
         const copyState = {...state};
         delete copyState[action.payload.id];
         return copyState;
      }
      default: {
         return state;
      }
   }
};

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todoId: string, id: string) => {
   return {
      type: "REMOVE_TASK",
      payload: {
         todoId,
         id,
      }
   } as const;
};

type AddTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todoId: string, title: string) => {
   return {
      type: "ADD_TASK",
      payload: {
         todoId,
         title
      }
   } as const;
};

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (todoId: string, id: string, isDone: boolean) => {
   return {
      type: "CHANGE_TASK_STATUS",
      payload: {
         todoId,
         id,
         isDone
      }
   } as const;
}

type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>;
export const updateTaskTitleAC = (todoId: string, id: string, title: string) => {
   return {
      type: "UPDATE_TASK_TITLE",
      payload: {
         todoId,
         id,
         title
      }
   } as const;
}

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType
   | updateTaskTitleACType | RemoveTodolistACType | AddTodolistACType;