import {AxiosResponse} from 'axios'
import {instance} from "../../common/instance/instance";
import {ResponseType} from "../../common/types";
import {TodolistType} from "./todolistsAPI.types";

export const todolistsAPI = {
   getTodolists() {
      return instance.get<TodolistType[]>('todo-lists');
   },
   createTodolist(title: string) {
      return instance.post<null, AxiosResponse<ResponseType<{ item: TodolistType }>>, {
         title: string
      }>('todo-lists', {title});
   },
   deleteTodolist(id: string) {
      return instance.delete<ResponseType>(`todo-lists/${id}`);
   },
   updateTodolist(id: string, title: string) {
      return instance.put<null, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title});
   },
}





