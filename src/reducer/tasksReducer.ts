import {TaskType} from "../components/Todolist";

export const tasksReducer = (state: TaskType[], action: ActionType) => {
   switch (action.type) {
      case "REMOVE_TASK": {
         return state.map(t => t.id !== action.id);
      }
      default: {
         return state
      }
   }
};

type RemoveTaskType = ReturnType<typeof removeTask>;

export const removeTask = (id: string) => {
   return {
      type: "REMOVE_TASK",
      id
   } as const;
};

type ActionType = RemoveTaskType;