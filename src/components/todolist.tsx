import React, {FC, JSX} from 'react';
import {FilterType, TaskType} from "../App";

type TodolistProps = {
   title: string
   tasks: TaskType[]
   removeTask: (taskId: number) => void
   changeFilter: (filterValue: FilterType) => void
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {title, tasks, removeTask, changeFilter} = props;

   const onChangeFilterHandler = (filterValue: FilterType) => {
      changeFilter(filterValue);
   }

   const listItems: JSX.Element[] = tasks.map(t => {
      const onClickRemoveTaskHandler = () => removeTask(t.id);
      return (
         <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.taskTitle}</span>
            <button onClick={onClickRemoveTaskHandler}>X</button>
         </li>
      );
   })

   let tasksList: JSX.Element = tasks.length
      ? <ul>{listItems}</ul>
      : <span>Your tasksList is empty</span>


   return (
      <div className="todolist">
         <h3>{title}</h3>
         <div>
            <input/>
            <button>+</button>
         </div>
         {tasksList}
         <div>
            <button onClick={() => onChangeFilterHandler("all")}>All</button>
            <button onClick={() => onChangeFilterHandler("active")}>Active</button>
            <button onClick={() => onChangeFilterHandler("completed")}>Completed</button>
         </div>
      </div>
   );
};