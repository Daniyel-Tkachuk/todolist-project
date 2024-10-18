import React, {FC, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {
   changeTodolistFilterAC, changeTodolistTitleTC,
   FilterValuesType,
   getTodolistsTC, removeTodolistTC,
   TodolistDomainType
} from "../../state/reducers/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../state/reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "../todolists/Todolist";


type Props = {}

export const TodolistsList: FC<Props> = (props) => {
   const {} = props;

   const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
   const tasks = useAppSelector<TasksStateType>(state => state.tasks);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTodolistsTC());
   }, []);


   const removeTask = useCallback((id: string, todolistId: string) => {
      dispatch(removeTaskTC(todolistId, id));
   }, []);

   const addTask = useCallback((title: string, todolistId: string) => {
      dispatch(addTaskTC(todolistId, title));
   }, []);

   const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, id, {status}));
   }, []);

   const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, id, {title}));
   }, []);


   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC(todolistId, value);
      dispatch(action);
   }, []);

   const removeTodolist = useCallback((id: string) => {
      dispatch(removeTodolistTC(id));
   }, []);

   const changeTodolistTitle = useCallback((id: string, title: string) => {
      dispatch(changeTodolistTitleTC(id, title));
   }, []);


   return (
      <>
         {
            todolists.map(tl => {
               const allTodolistTasks = tasks[tl.id];
               return (
                  <Grid item key={tl.id}>
                     <Paper sx={{p: '5px 20px 20px 20px'}}>
                        <Todolist
                           todolist={tl}
                           tasks={allTodolistTasks}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeStatus}
                           removeTodolist={removeTodolist}
                           changeTaskTitle={changeTaskTitle}
                           changeTodolistTitle={changeTodolistTitle}
                        />
                     </Paper>
                  </Grid>
               )
            })
         }
      </>
   )
}