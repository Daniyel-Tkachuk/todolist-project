import {instance} from "../../common/instance/instance";
import {ResponseType} from "../../common/types";
import {AxiosResponse} from "axios";
import {TaskType, UpdateTaskModelType, GetTasksResponse} from "./tasksAPI.types";


export const tasksAPI = {
   getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
   },
   deleteTask(todolistId: string, taskId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
   },
   createTask(todolistId: string, title: string) {
      return instance.post<null, AxiosResponse<ResponseType<{ item: TaskType }>>, {
         title: string
      }>(`todo-lists/${todolistId}/tasks`, {title});
   },
   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      return instance.put<null, AxiosResponse<ResponseType<{
         item: TaskType
      }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
   }
}
