import React, {useCallback, useEffect} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "../todolists/Todolist";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {
   addTodolistTC,
   changeTodolistFilterAC, changeTodolistTitleTC,
   FilterValuesType,
   getTodolistsTC, removeTodolistTC,
   TodolistDomainType
} from "../../state/reducers/todolists-reducer";
import {
   addTaskTC,
   removeTaskTC,
   TaskDomainType,
   TasksStateType,
   updateTaskTC
} from "../../state/reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";

export const Main = () => {
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

   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistTC(title));
   }, [dispatch]);


   return (
      <Container fixed maxWidth={false}>
         <Grid container sx={{m: '30px 0 50px'}}>
            <AddItemForm addItem={addTodolist}/>
         </Grid>
         <Grid container spacing={4}>
            {
               todolists.map(tl => {
                  let allTodolistTasks = tasks[tl.id];

                  return <Grid item key={tl.id}>
                     <Paper sx={{p: '5px 20px 20px 20px'}}>
                        <Todolist
                           id={tl.id}
                           title={tl.title}
                           entityStatus={tl.entityStatus}
                           tasks={allTodolistTasks}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeStatus}
                           filter={tl.filter}
                           removeTodolist={removeTodolist}
                           changeTaskTitle={changeTaskTitle}
                           changeTodolistTitle={changeTodolistTitle}
                        />
                     </Paper>
                  </Grid>
               })
            }
         </Grid>
      </Container>
   );
};
