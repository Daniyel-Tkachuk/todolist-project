import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;

export type AddTaskAT = ReturnType<typeof addTaskAC>;

export type ChangeTaskStatusActionType = {
   type: 'CHANGE-TASK-STATUS',
   todolistId: string
   taskId: string
   status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
   type: 'CHANGE-TASK-TITLE',
   todolistId: string
   taskId: string
   title: string
}

export type SetTasksAT = ReturnType<typeof setTasksAC>;

type ActionsType = RemoveTaskAT | AddTaskAT
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodolistActionType
   | RemoveTodolistActionType
   | SetTodolistsAT
   | SetTasksAT

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
      case 'CHANGE-TASK-STATUS': {
         let todolistTasks = state[action.todolistId];
         let newTasksArray = todolistTasks
            .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

         state[action.todolistId] = newTasksArray;
         return ({...state});
      }
      case 'CHANGE-TASK-TITLE': {
         let todolistTasks = state[action.todolistId];
         // найдём нужную таску:
         let newTasksArray = todolistTasks
            .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

         state[action.todolistId] = newTasksArray;
         return ({...state});
      }
      case 'ADD-TODOLIST': {
         return {
            ...state,
            [action.todolistId]: []
         }
      }
      case 'REMOVE-TODOLIST': {
         const copyState = {...state};
         delete copyState[action.id];
         return copyState;
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
   return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const;
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
   return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const;
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
   return {type: 'SET-TASKS', tasks, todolistId} as const;
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
