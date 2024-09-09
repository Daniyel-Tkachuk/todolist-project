import {TasksStateType} from '../App';
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './todolists-reducer';
import {DomainTaskModelType, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksAT = ReturnType<typeof setTasksAC>;
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>

type ActionsType = RemoveTaskAT | AddTaskAT
   | ChangeTaskStatusAT
   | ChangeTaskTitleAT
   | AddTodolistAT
   | RemoveTodolistAT
   | SetTodolistsAT
   | SetTasksAT
   | UpdateTaskAT

const initialState: TasksStateType = {
   /*"todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'SET-TODOLISTS': {
         const copyState = {...state};

         action.todolists.forEach(tl => {
            copyState[tl.id] = [];
         })

         return copyState;
      }
      case 'SET-TASKS': {
         return {
            ...state,
            [action.todolistId]: action.tasks
         }
      }
      case 'REMOVE-TASK': {
         const stateCopy = {...state}

         const tasks = stateCopy[action.todolistId];
         stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
         return stateCopy;
      }
      case 'ADD-TASK': {
         const {todoListId} = action.task;

         return {
            ...state,
            [todoListId]: [action.task, ...state[todoListId]]
         }
      }
      /*case 'CHANGE-TASK-STATUS': {
         let todolistTasks = state[action.todolistId];

         state[action.todolistId] = todolistTasks
            .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
         return ({...state});
      }
      case 'CHANGE-TASK-TITLE': {
         let todolistTasks = state[action.todolistId];

         state[action.todolistId] = todolistTasks
            .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
         return ({...state});
      }*/
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
         const tasks = state[action.todolistId];

         state[action.todolistId] = tasks
            .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t);
         return {...state};
      }
      default:
         return state;
   }
}

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

/*export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todolistId].find(t => t.id === taskId);

      if (task) {
         const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status
         }

         todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
               dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
      }
   }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todolistId].find(t => t.id === taskId);

      if (task) {
         const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title
         }
         todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
               dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
      }
   }
}*/

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