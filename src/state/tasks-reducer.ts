import {TasksStateType} from '../app/App';
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './todolists-reducer';
import {
   TaskPriorities,
   TaskStatuses,
   TaskType,
   todolistsAPI,
   UpdateTaskModelType
} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'SET-TODOLISTS': {
         const copyState = {...state};

         action.todolists.forEach(tl => {
            copyState[tl.id] = [];
         });

         return copyState;
      }
      case 'SET-TASKS': {
         return {...state, [action.todolistId]: action.tasks}
      }
      case 'REMOVE-TASK': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
         }
      }
      case 'ADD-TASK': {
         const {todoListId} = action.task;
         return {
            ...state,
            [todoListId]: [action.task, ...state[todoListId]]
         }
      }
      case 'ADD-TODOLIST': {
         return {
            ...state,
            [action.todolist.id]: []
         }
      }
      case 'REMOVE-TODOLIST': {
         const copyState = {...state};
         delete copyState[action.id];
         return copyState;
      }
      case 'UPDATE-TASK': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId]
               .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
         };
      }
      default:
         return state;
   }
}

// --------- actions -----------
export const removeTaskAC = (taskId: string, todolistId: string) => {
   return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const;
}
export const addTaskAC = (task: TaskType) => {
   return {type: 'ADD-TASK', task} as const;
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
   return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const;
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
   return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const;
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
   return {type: 'SET-TASKS', tasks, todolistId} as const;
}
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: DomainTaskModelType) => {
   return {
      type: 'UPDATE-TASK',
      todolistId,
      taskId,
      domainModel
   } as const;
}

// --------- thunks -----------
export const getTasksTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.getTasks(todolistId)
         .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items));
         })
   }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.deleteTask(todolistId, taskId)
         .then(res => {
            dispatch(removeTaskAC(taskId, todolistId));
         })
   }
}
export const addTaskTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.createTask(todolistId, title)
         .then(res => {
            dispatch(addTaskAC(res.data.data.item));
         })
   }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: DomainTaskModelType) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todolistId].find(t => t.id === taskId);

      if (task) {
         const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
         }
         todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
               dispatch(updateTaskAC(todolistId, taskId, domainModel));
            })

      }
   }
}

// --------- types -----------
type ActionsType =
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof changeTaskStatusAC>
   | ReturnType<typeof changeTaskTitleAC>
   | ReturnType<typeof setTasksAC>
   | ReturnType<typeof updateTaskAC>
   | AddTodolistAT
   | RemoveTodolistAT
   | SetTodolistsAT;

type DomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
};