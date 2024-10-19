import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './todolistsReducer';
import {tasksAPI} from '../api/tasksAPI'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setStatusAC} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {TaskType, UpdateTaskModelType} from "../api/tasksAPI.types";
import {RESULT_CODE, TaskPriorities, TaskStatuses} from "../../common/enums";


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
         return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: "idle"}))}
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
            [todoListId]: [{...action.task, entityStatus: "idle"}, ...state[todoListId]]
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
      case 'SET-TASK-ENTITY-STATUS': {
         const {todolistId, taskId, entityStatus} = action.payload;
         return {
            ...state,
            [todolistId]: state[todolistId]
               .map(t => t.id === taskId ? {...t, entityStatus} : t)
         }
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
export const setTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) => {
   return {
      type: "SET-TASK-ENTITY-STATUS",
      payload: {
         todolistId,
         taskId,
         entityStatus
      }
   } as const;
}

// --------- thunks -----------
export const getTasksTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"));
      tasksAPI.getTasks(todolistId)
         .then(res => {
            if (!res.data.error) {
               dispatch(setTasksAC(todolistId, res.data.items));
            } else {
               dispatch(setAppErrorAC(res.data.error))
            }
            dispatch(setStatusAC("succeeded"));
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error)
         })
   }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"))
      dispatch(setTaskEntityStatusAC(todolistId, taskId, "loading"))

      tasksAPI.deleteTask(todolistId, taskId)
         .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
               dispatch(removeTaskAC(taskId, todolistId));
               dispatch(setStatusAC("succeeded"));
            } else {
               handleServerAppError(dispatch, res.data);
            }
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error)
            dispatch(setTaskEntityStatusAC(todolistId, taskId, "idle"))
         })
   }
}
export const addTaskTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setStatusAC("loading"));
      tasksAPI.createTask(todolistId, title)
         .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
               const task: TaskType = res.data.data.item;
               dispatch(addTaskAC(task));
               dispatch(setStatusAC("succeeded"));
            } else {
               handleServerAppError(dispatch, res.data)
            }
         })
         .catch(error => {
            handleServerNetworkError(dispatch, error)
         })
   }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: DomainTaskModelType) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      dispatch(setStatusAC("loading"));
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

         tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => {
               if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                  dispatch(updateTaskAC(todolistId, taskId, domainModel));
                  dispatch(setStatusAC("succeeded"));
               } else {
                  handleServerAppError(dispatch, res.data)
               }
            })
            .catch(error => {
               handleServerNetworkError(dispatch, error)
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
   | ReturnType<typeof setTaskEntityStatusAC>
   | AddTodolistAT
   | RemoveTodolistAT
   | SetTodolistsAT;


export type TasksStateType = {
   [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
   entityStatus: RequestStatusType
}

type DomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
};
