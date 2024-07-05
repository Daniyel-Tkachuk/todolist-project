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


   const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id]);
   const dispatch = useDispatch<Dispatch>();

   const removeTodolist = useCallback(() => dispatch(removeTodolistAC(id)), [id, removeTodolistAC]);

   const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)), [id, addTaskAC]);

   const updateTaskTitle = useCallback((taskId: string, title: string) => {
      dispatch(updateTaskTitleAC(id, taskId, title))
   }, [id, updateTaskTitleAC]);

   const updateTodolistTitle = useCallback((title: string) => {
      dispatch(updateTodolistTitleAC(id, title));
   }, [id, updateTodolistTitleAC]);

   const onChangeStatus = useCallback((taskId: string, checked: boolean) => {
      dispatch(changeTaskStatusAC(id, taskId, checked));
   }, [id, changeTaskStatusAC]);

   const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(id, taskId)), [id, removeTaskAC]);

   const changeFilterAll = useCallback(() => dispatch(changeFilterAC(id, 'all')), [id, changeFilterAC]);
   const changeFilterActive = useCallback(() => dispatch(changeFilterAC(id, 'active')) , [id, changeFilterAC]);
   const changeFilterCompleted = useCallback(() => dispatch(changeFilterAC(id, 'completed')), [id, changeFilterAC]);

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
            <Button name="x" onClick={removeTodolist}/>
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
            <Button name="all"
                    className={filter === "all" ? "active" : ""}
                    onClick={changeFilterAll}
            />
            <Button name="active"
                    className={filter === "active" ? "active" : ""}
                    onClick={changeFilterActive}
            />
            <Button name="completed"
                    className={filter === "completed" ? "active" : ""}
                    onClick={changeFilterCompleted}
            />
         </div>
      </div>
   );
});