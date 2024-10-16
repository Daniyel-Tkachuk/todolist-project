import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/todolists/Todolist';
import {AddItemForm} from '../components/addItemForm/AddItemForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import {
   changeTodolistFilterAC,
   FilterValuesType, getTodolistsTC,
   TodolistDomainType, addTodolistTC, removeTodolistTC, changeTodolistTitleTC
} from '../state/reducers/todolists-reducer'
import {
   addTaskTC,
   removeTaskTC, TasksStateType, updateTaskTC
} from '../state/reducers/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../state/store';
import {TaskStatuses} from '../api/todolists-api'
import {changeThemeAC, RequestStatusType, ThemeMode} from "../state/reducers/app-reducer";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../components/menuButton/menuButton";
import AppBar from "@mui/material/AppBar";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline, Switch} from "@mui/material";
import {getTheme} from "../common/theme";

function App() {
   const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
   const tasks = useAppSelector<TasksStateType>(state => state.tasks);
   const status = useAppSelector<RequestStatusType>(state => state.app.status);
   const themeMode = useAppSelector<ThemeMode>(state => state.app.themeMode);

   const theme = getTheme(themeMode);

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

   const changeModeHandler = () => {
      dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"));
   }

   return (
      <ThemeProvider theme={theme}>
         <ErrorSnackbar/>
         <CssBaseline/>

         <AppBar position="static">
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <div>
                  <MenuButton>Login</MenuButton>
                  <MenuButton>Logout</MenuButton>
                  <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                  <Switch color="default" onChange={changeModeHandler}/>
               </div>
            </Toolbar>
         </AppBar>

         {status === "loading" && <LinearProgress color="secondary"/>}

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
      </ThemeProvider>

   );
}

export default App;
