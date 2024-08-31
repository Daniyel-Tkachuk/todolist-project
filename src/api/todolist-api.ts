import axios from "axios";

const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1/",
   withCredentials: true,
   headers: {
      "API-KEY": "f2e2917a-3b66-4825-a47c-2a00b418f9e6",
   }
})

export const todolistAPI = {
   getTodolists() {
      return instance
         .get<TodolistType[]>("todo-lists");
   },
   createTodolist(title: string) {
      return instance
         .post<ResponseType<{ item: TodolistType }>>("todo-lists", {title});
   },
   deleteTodolist(todoId: string) {
      return instance
         .delete<ResponseType>(`todo-lists/${todoId}`);
   },
   updateTodolist(todoId: string, newTitle: string) {
      return instance
         .put<ResponseType>(`todo-lists/${todoId}`, {title: newTitle});
   }
}

type TodolistType = {
   id: string
   title: string
   addedDate: string
   order: number
}

type ResponseType<T = {}> = {
   resultCode: number
   fieldsErrors: string[]
   messages: string[]
   data: T
}
