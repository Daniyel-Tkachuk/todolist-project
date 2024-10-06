import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/todolists/Todolist';
import {AddItemForm} from '../components/addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {
   changeTodolistFilterAC,
   FilterValuesType, getTodolistsTC,
   TodolistDomainType, addTodolistTC, removeTodolistTC, changeTodolistTitleTC
} from '../state/reducers/todolists-reducer'
import {
   addTaskTC,
   removeTaskTC, updateTaskTC
} from '../state/reducers/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api'
import {RequestStatusType} from "../state/reducers/app-reducer";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar";


export type TasksStateType = {
   [key: string]: Array<TaskType>
}


function App() {
   const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
   const tasks = useAppSelector<TasksStateType>(state => state.tasks)
   const status = useAppSelector<RequestStatusType>(state => state.app.status)
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
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>

         {status === "loading" && <LinearProgress color="secondary"/>}

         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
               {
                  todolists.map(tl => {
                     let allTodolistTasks = tasks[tl.id];

                     return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                           <Todolist
                              id={tl.id}
                              title={tl.title}
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
            <ErrorSnackbar />
         </Container>
      </div>
   );
}

export default App;
