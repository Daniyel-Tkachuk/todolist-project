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
            console.log(res);
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

