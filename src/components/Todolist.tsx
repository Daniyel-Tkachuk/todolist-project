import React, {ChangeEvent, FC, JSX, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";

type TaskType = {
   id: string
   title: string
   isDone: boolean
}
export type TasksStateType = {
   [key: string]: TaskType[]
}

type TodolistProps = {
   todoId: string
   title: string
   tasks: TaskType[]
   filter: FilterValuesType
   removeTodolist: (todoId: string) => void
   removeTask: (todoId: string, taskId: string) => void
   changeFilter: (todoId: string, filterValue: FilterValuesType) => void
   addTask: (todoId: string, taskTitle: string) => void
   changeTaskTitle: (todoId: string, taskId: string, taskTitle: string) => void
   changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {
      todoId, title, tasks, filter,
      removeTask, changeFilter, addTask,
      changeTaskTitle, changeTaskStatus, removeTodolist
   } = props;


   const [taskTitle, setTaskTitle] = useState<string>("");
   const [inputError, setInputError] = useState<boolean>(false);

   const onChangeFilterHandler = (filterValue: FilterValuesType) => changeFilter(todoId, filterValue);

   const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      debugger
      const trimmedTitle = e.currentTarget.value.trim();
      if (trimmedTitle || e.currentTarget.value.length === 0) {
         setTaskTitle(e.currentTarget.value);
         inputError && setInputError(false);
      } else {
         setInputError(true);
      }
   };

   const removeTodolistHandler = () => {
      removeTodolist(todoId);
   }

   const onClickAddTaskHandler = () => {
      addTask(todoId, taskTitle);
      setTaskTitle("");
   };

   const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === "Enter" && onClickAddTaskHandler();
   };

   /*const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
      changeTaskStatus(taskId, e.currentTarget.checked);
   }*/

   const listItems: JSX.Element[] = tasks.map(t => {
      const onClickRemoveTaskHandler = () => removeTask(todoId, t.id);
      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
         changeTaskStatus(todoId, t.id, e.currentTarget.checked);
      }
      return (
         <li key={t.id}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatusHandler}
            />
            <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
            <button onClick={onClickRemoveTaskHandler}>X</button>
         </li>
      );
   });

   const tasksList: JSX.Element = tasks.length
      ? <ul>{listItems}</ul>
      : <span>Your tasksList is empty</span>;

   let isAddBtnDisabled = !taskTitle || taskTitle.length >= 15;

   const userMessage = inputError
      ? <span style={{color: "red"}}>Your title is too empty</span>
      : taskTitle.length < 15
         ? <span>Enter new title</span>
         : <span style={{color: "red"}}>Your title is too long</span>


   return (
      <div className="todolist">
         <h3>
            {title}
            <button onClick={removeTodolistHandler}>X</button>
         </h3>

         <div>
            <input type="text"
                   className={`input ${inputError ? "input-error" : ""}`}
                   value={taskTitle}
                   onChange={onChangeTaskTitleHandler}
                   onKeyDown={onClickEnter}
            />
            <button disabled={isAddBtnDisabled} onClick={onClickAddTaskHandler}>+</button>
            <div style={{fontSize: "12px"}}>
               {userMessage}
            </div>
         </div>
         {tasksList}
         <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={() => onChangeFilterHandler("all")}
            >
               All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={() => onChangeFilterHandler("active")}
            >
               Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={() => onChangeFilterHandler("completed")}
            >
               Completed
            </button>
         </div>
      </div>
   );
};