import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
   title: 'API',
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistAPI.getTodolists()
         .then(res => {
            setState(res.data);
         });
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null);
   const title = "NEW Todolist"

   useEffect(() => {
      todolistAPI.createTodolist(title)
         .then(res => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   const todolistId = "8624fa02-eadb-4398-87a7-999305bcde34";
   useEffect(() => {
      todolistAPI.deleteTodolist(todolistId)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   const todolistId = "2c7d5949-0d10-4553-ab20-2fc3f1105d0a";
   const newTitle = "NEW TITLE";

   useEffect(() => {
      todolistAPI.updateTodolist(todolistId, newTitle)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}