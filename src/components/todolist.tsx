import React, {ChangeEvent, FC, JSX, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";

type TodolistProps = {
   title: string
   tasks: TaskType[]
   removeTask: (taskId: string) => void
   changeFilter: (filterValue: FilterType) => void
   addTask: (taskTitle: string) => void
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {title, tasks, removeTask, changeFilter, addTask} = props;

   const [taskTitle, setTaskTitle] = useState<string>("");

   const onChangeFilterHandler = (filterValue: FilterType) => changeFilter(filterValue);

   const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(e.currentTarget.value);
   };

   const onClickAddTaskHandler = () => {
      addTask(taskTitle);
      setTaskTitle("");
   };

   const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === "Enter" && onClickAddTaskHandler();
   };

   const listItems: JSX.Element[] = tasks.map(t => {
      const onClickRemoveTaskHandler = () => removeTask(t.id);
      return (
         <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.taskTitle}</span>
            <button onClick={onClickRemoveTaskHandler}>X</button>
         </li>
      );
   });

   const tasksList: JSX.Element = tasks.length
      ? <ul>{listItems}</ul>
      : <span>Your tasksList is empty</span>;

   let isAddBtnDisabled = !taskTitle || taskTitle.length >= 15;

   const userMassage = taskTitle.length < 15
      ? <span>Enter new title</span>
      : <span style={{color: "red"}}>Your title is too long</span>;

   return (
      <div className="todolist">
         <h3>{title}</h3>
         <div>
            <input type="text"
                   value={taskTitle}
                   onChange={onChangeTaskTitleHandler}
                   onKeyDown={onClickEnter}
            />
            <button disabled={isAddBtnDisabled} onClick={onClickAddTaskHandler}>+</button>
            <div style={{fontSize: "12px"}}>
               {userMassage}
            </div>
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