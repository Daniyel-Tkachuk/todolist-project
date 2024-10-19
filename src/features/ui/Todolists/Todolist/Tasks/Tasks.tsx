import React, {FC, useEffect} from 'react';
import {TodolistDomainType} from "../../../../model/todolistsReducer";
import {selectTasks} from "../../../../model/tasksSelector";
import {getTasksTC} from "../../../../model/tasksReducer";
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {useAppDispatch, useAppSelector} from "../../../../../common/hooks";
import {TaskStatuses} from "../../../../../common/enums";

type Props = {
   todolist: TodolistDomainType
};

export const Tasks: FC<Props> = ({todolist}) => {
   const {id, filter} = todolist;

   const tasks = useAppSelector(selectTasks)[id];
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getTasksTC(id))
   }, []);

   let tasksForTodolist = tasks;

   if (filter === "active") {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
   }

   if (filter === "completed") {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
   }

   const getJSX = () => {
      return (
         tasksForTodolist.length === 0
            ? <p>Тасок нет</p>
            : <List sx={{mb: '15px'}}>
               {tasksForTodolist.map(t => {
                  return <Task key={t.id} todolist={todolist} task={t}/>
               })}
            </List>
      )
   }

   return (
      <>{getJSX()}</>
   );
};
