import React, {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig} from "axios";

export default {
   title: 'API',
}

const config: AxiosRequestConfig = {
   withCredentials: true,
   headers: {
      "API-KEY": "f2e2917a-3b66-4825-a47c-2a00b418f9e6",
   }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", config)
         .then(res => {
            setState(res.data);
         });
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "BLAAAA"}, config)
         .then(res => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   const todolistId = "e780be55-2039-4528-a1b3-7891b7a57707";
   useEffect(() => {
      axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   const todolistId = "671978c2-b85a-4fc9-a5c5-c65304d9add1";
   useEffect(() => {
      axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "ЗАМЕНА"}, config)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}