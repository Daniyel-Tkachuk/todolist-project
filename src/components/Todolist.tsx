import React, {FC, memo, useCallback} from 'react';
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

export const Todolist: FC<TodolistProps> = memo((props) => {
   const {
      todolist: {id, title, filter}
   } = props;

   console.log("Todolist")

   const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id]);
   const dispatch = useDispatch<Dispatch>();

   const removeTodolist = useCallback(() => dispatch(removeTodolistAC(id)), [id, dispatch]);

   const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)), [id, dispatch]);

   const updateTaskTitle = useCallback((taskId: string, title: string) => {
      dispatch(updateTaskTitleAC(id, taskId, title))
   }, [id]);

   const updateTodolistTitle = (title: string) => {
      dispatch(updateTodolistTitleAC(id, title));
   }

   const onChangeStatus = useCallback((taskId: string, checked: boolean) => {
      dispatch(changeTaskStatusAC(id, taskId, checked));
   }, [id, dispatch]);

   const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(id, taskId)), [dispatch]);

   const changeFilterAll = useCallback(() => dispatch(changeFilterAC(id, 'all')), [id, dispatch]);
   const changeFilterActive = useCallback(() => dispatch(changeFilterAC(id, 'active')) , [id, dispatch]);
   const changeFilterCompleted = useCallback(() => dispatch(changeFilterAC(id, 'completed')), [id, dispatch]);

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

         <AddItemForm addItem={addTask}/>

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
                    onClick={changeFilterAll}
            />
            <Button textBtn="active"
                    className={filter === 'active' ? "active-filter" : ""}
                    onClick={changeFilterActive}
            />
            <Button textBtn="complited"
                    className={filter === 'completed' ? "active-filter" : ""}
                    onClick={changeFilterCompleted}
            />
         </div>
      </div>
   );
});