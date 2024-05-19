import React, {ChangeEvent, FC, JSX} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
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
   updateTaskTitle: (todoId: string, taskId: string, taskTitle: string) => void
   updateTodolistTitle: (todoId: string, title: string) => void
   changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistProps> = (props) => {

   const {
      todoId, title, tasks, filter,
      removeTask, changeFilter, addTask,
      updateTaskTitle, changeTaskStatus, removeTodolist,
      updateTodolistTitle
   } = props;


   const onChangeFilterHandler = (filterValue: FilterValuesType) => changeFilter(todoId, filterValue);

   const removeTodolistHandler = () => {
      removeTodolist(todoId);
   }

   const addTaskHandler = (title: string) => {
      addTask(todoId, title)
   }

   const updateTaskTitleHandler = (taskId: string, title: string) => {
      updateTaskTitle(todoId, taskId, title);
   }

   const updateTodolistTitleHandler = (title: string) => {
      updateTodolistTitle(todoId, title);
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
            <EditableSpan title={t.title}
                          isDone={t.isDone}
                          updateTitle={(title: string) => updateTaskTitleHandler(t.id, title)}
            />
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
            <EditableSpan title={title} updateTitle={updateTodolistTitleHandler}/>
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