import React, {FC, JSX} from 'react';
import {TaskType} from "../App";

type TodolistProps = {
   title: string
   tasks: TaskType[]
   removeTask: (taskId: number) => void
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {title, tasks, removeTask} = props;

   const listItems: JSX.Element[] = tasks.map(t => {
      return (
         <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.taskTitle}</span>
            <button onClick={() => removeTask(t.id)}>X</button>
         </li>
      );
   })

   let tasksList: JSX.Element[] | JSX.Element = tasks.length
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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   );
};