import React, {FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../reducers/tasksReducer";
import {FilterValuesType} from "../reducers/todolistsReducer";
import {CheckBox} from "./CheckBox";
import {Button} from "./Button";


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

   const onChangeStatusHandler = (taskId: string, checked: boolean) => {
      changeTaskStatus(todoId, taskId, checked);
   }

   const onClickRemoveTaskHandler = (taskId: string) => removeTask(todoId, taskId);

   return (
      <div className="todolist">
         <h3>
            <EditableSpan title={title} updateTitle={updateTodolistTitleHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
         </h3>

         <AddItemForm onClick={addTaskHandler}/>

         <ul>
            {
               tasks.length ? tasks.map(t => {
                  return (
                     <li key={t.id}>
                        <CheckBox checkedValue={t.isDone}
                                  onChangeChecked={(checked: boolean) => onChangeStatusHandler(t.id, checked)}
                        />
                        <EditableSpan title={t.title}
                                      isDone={t.isDone}
                                      updateTitle={(title: string) => updateTaskTitleHandler(t.id, title)}
                        />
                        <Button textBtn="X" onClick={() => onClickRemoveTaskHandler(t.id)}/>
                     </li>
                  )
               }) : <span>Your tasksList is empty</span>
            }
         </ul>

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