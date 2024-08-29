import React, {useEffect, useState} from 'react'
import axios from "axios";
import {AxiosRequestConfig} from "axios/index";

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
            setState(res.data.data.item)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
   }, [])

   return <div>{JSON.stringify(state)}</div>
}