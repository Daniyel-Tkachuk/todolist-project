import axios from "axios";

const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1/",
   withCredentials: true,
   headers: {
      "API-KEY": "f2e2917a-3b66-4825-a47c-2a00b418f9e6",
   }
})

export const taskAPI = {
   getTask(todoId: string) {
      return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`)
   },
   createTask() {

   },
   deleteTask() {

   },
   updateTask() {

   }
}

type TaskType = {
   description: string
   title: string
   completed: boolean
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