import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
   title: 'Tasks-API',
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";

   useEffect(() => {
      taskAPI.getTask(todoId)
         .then(res => {
            console.log(res.data)
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
            console.log(res);
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null);
   const todoId = "cd63f874-f79b-4299-98b3-a0074d640bb6";
   const taskId = "15397d26-9e8b-4380-bff5-4c9870a16549";

   useEffect(() => {
      taskAPI.deleteTask(todoId, taskId)
         .then(res => {
            console.log(res);
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}
