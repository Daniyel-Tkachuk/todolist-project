import React, {useEffect, useState} from 'react'
import {taskAPI, UpdateTaskModuleType} from "../api/task-api";

export default {
   title: 'Tasks-API',
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";

   useEffect(() => {
      taskAPI.getTask(todoId)
         .then(res => {
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";
   const taskTitle = "new task";

   useEffect(() => {
      taskAPI.createTask(todoId, taskTitle)
         .then(res => {
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";
   const taskId = "e1268fe7-0b33-4d5a-94ad-e3bb227090d2";

   useEffect(() => {
      taskAPI.deleteTask(todoId, taskId)
         .then(res => {
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";
   const taskId = "9436618d-e01d-41ad-9122-a9be7c2e2e99";
   const updateModal: UpdateTaskModuleType = {
      title: "Изменил название таски",
      deadline: "",
      description: "",
      priority: 0,
      startDate: "",
      status: 2
   }

   useEffect(() => {
      taskAPI.updateTask(todoId, taskId, updateModal)
         .then(res => {
            setState(res.data.data.item);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}
