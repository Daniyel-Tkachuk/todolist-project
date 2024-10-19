import React, {FC} from 'react'
import {AddItemForm} from '../../../../common/components'
import {TodolistDomainType} from '../../../model/todolistsReducer'
import {addTaskTC} from "../../../model/tasksReducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {useAppDispatch} from "../../../../common/hooks";

type Props = {
   todolist: TodolistDomainType
}

export const Todolist: FC<Props> = React.memo((props) => {
   const {todolist} = props;

   const dispatch = useAppDispatch()

   const addTaskHandler = (title: string) => {
      dispatch(addTaskTC(todolist.id, title))
   }

   return (
      <div>
         <TodolistTitle todolist={todolist}/>
         <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"}/>
         <Tasks todolist={todolist}/>
         <FilterTasksButtons todolist={todolist}/>
      </div>
   )
})


