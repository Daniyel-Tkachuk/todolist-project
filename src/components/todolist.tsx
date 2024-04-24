import React, {FC} from 'react';
import {TaskType} from "../App";

type TodolistProps = {
   title: string
   tasks: TaskType[]
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {title, tasks} = props;

   return (
      <div className="todolist">
         <h3>{title}</h3>
         <div>
            <input/>
            <button>+</button>
         </div>
         <ul>
            <li>
               <input type="checkbox" checked={tasks[0].isDone}/>
               <span>{tasks[0].taskTitle}</span>
            </li>
            <li>
               <input type="checkbox" checked={tasks[1].isDone}/>
               <span>{tasks[1].taskTitle}</span>
            </li>
            <li>
               <input type="checkbox" checked={tasks[2].isDone}/>
               <span>{tasks[2].taskTitle}</span>
            </li>
         </ul>
         <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   );
};