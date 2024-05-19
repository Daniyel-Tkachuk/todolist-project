import {TaskType} from "../components/Todolist";
import {v1} from "uuid";

export const tasksReducer = (state: TaskType[], action: ActionType) => {
   switch (action.type) {
      case "REMOVE_TASK": {
         return state.map(t => t.id !== action.payload.id);
      }
      case "ADD_TASK": {
         const newTask = {id: v1(), title: action.payload.title, isDone: false};
         return [newTask, ...state];
      }
      case "CHANGE_TASK_STATUS": {
         const {id, isDone} = action.payload;
         return state.map(t => t.id === id ? {...t, isDone} : t);
      }
      default: {
         return state
      }
   }
};

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string) => {
   return {
      type: "REMOVE_TASK",
      payload: {
         id
      }
   } as const;
};

type AddTaskACType = ReturnType<typeof AddTaskAC>;
export const AddTaskAC = (title: string) => {
   return {
      type: "ADD_TASK",
      payload: {
         title
      }
   } as const;
};

type ChangeTaskStatusACType= ReturnType<typeof ChangeTaskStatusAC>;
export const ChangeTaskStatusAC = (id: string, isDone: boolean) => {
   return {
      type: "CHANGE_TASK_STATUS",
      payload: {
         id,
         isDone
      }
   } as const;
}

type ActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType;