import axios from "axios";
import {ResponseType} from "./todolist-api"

const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1/",
   withCredentials: true,
   headers: {
      "API-KEY": "f2e2917a-3b66-4825-a47c-2a00b418f9e6",
   }
})

export const taskAPI = {
   getTask(todoId: string) {
      return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`);
   },
   createTask(todoId: string, title: string) {
      return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoId}/tasks`, {title});
   },
   deleteTask(todoId: string, taskId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`);
   },
   updateTask() {

   }
}

type TaskType = {
   description: string
   title: string
   status: number
   priority: number
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}

type GetTaskType = {
   items: TaskType[]
   totalCount: number
   error: null | string
}