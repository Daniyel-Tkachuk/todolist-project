import React, {ChangeEvent, FC, JSX} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "../AddItemForm";

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


   const onChangeFilterHandler = (filterValue: FilterValuesType) => changeFilter(todoId, filterValue);

   const removeTodolistHandler = () => {
      removeTodolist(todoId);
   }

   const addTaskHandler = (title: string) => {
      addTask(todoId, title)
   }

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


   return (
      <div className="todolist">
         <h3>
            {title}
            <button onClick={removeTodolistHandler}>X</button>
         </h3>

         <AddItemForm onClick={addTaskHandler}/>
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