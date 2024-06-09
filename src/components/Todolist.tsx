import React, {FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
   addTaskAC,
   changeTaskStatusAC,
   removeTaskAC,
   TaskType,
   updateTaskTitleAC,
} from "../reducers/tasksReducer";
import {
   changeFilterAC,
   FilterValuesType,
   removeTodolistAC,
   TodolistType,
   updateTodolistTitleAC
} from "../reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Task} from "./Task";
import {Dispatch} from "redux";
import {Button} from "./Button";


type TodolistProps = {
   todolist: TodolistType
}

export const Todolist: FC<TodolistProps> = (props) => {
   const {
      todolist: {id, title, filter}
   } = props;

   const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id]);
   const dispatch = useDispatch<Dispatch>();

   const onChangeFilter = (filterValue: FilterValuesType) => dispatch(changeFilterAC(id, filterValue));

   const removeTodolist = () => dispatch(removeTodolistAC(id));

   const addTask = (title: string) => dispatch(addTaskAC(id, title))

   const updateTaskTitle = (taskId: string, title: string) => {
      dispatch(updateTaskTitleAC(id, taskId, title))
   }

   const updateTodolistTitle = (title: string) => {
      dispatch(updateTodolistTitleAC(id, title));
   }

   const onChangeStatus = (taskId: string, checked: boolean) => {
      dispatch(changeTaskStatusAC(id, taskId, checked));
   }

   const removeTask = (taskId: string) => dispatch(removeTaskAC(id, taskId));

   let tasksForFiltered = tasks;
   if (filter === "active") {
      tasksForFiltered = tasks.filter(t => !t.isDone);
   }
   if (filter === "completed") {
      tasksForFiltered = tasks.filter(t => t.isDone);
   }

   return (
      <div className="todolist">
         <h3>
            <EditableSpan title={title} updateTitle={updateTodolistTitle}/>
            <Button textBtn="x" onClick={removeTodolist}/>
         </h3>

         <AddItemForm onClick={addTask}/>

         <ul>
            {
               tasks.length
                  ? tasksForFiltered.map(t => {
                     return (
                        <Task key={t.id} task={t}
                              onChangeStatus={onChangeStatus}
                              removeTask={removeTask}
                              updateTaskTitle={updateTaskTitle}
                        />
                     )
                  })
                  : <span>Your tasksList is empty</span>
            }
         </ul>

         <div>
            <Button textBtn="all"
                    className={filter === 'all' ? "active-filter" : ""}
                    onClick={() => onChangeFilter("all")}
            />
            <Button textBtn="active"
                    className={filter === 'active' ? "active-filter" : ""}
                    onClick={() => onChangeFilter("active")}
            />
            <Button textBtn="complited"
                    className={filter === 'completed' ? "active-filter" : ""}
                    onClick={() => onChangeFilter("completed")}
            />
         </div>
      </div>
   );
};