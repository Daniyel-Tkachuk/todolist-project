import React, {useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TodolistsType = { id: string, title: string, filter: FilterValuesType };
export type FilterValuesType = "all" | "active" | "completed";

function App() {
   const todolistID1 = v1();
   const todolistID2 = v1();

   const [todolists, setTodolists] = useState<TodolistsType[]>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'completed'},
   ]);
   const [tasks, setTasks] = useState<TasksStateType>({
      [todolistID1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'ReactJS', isDone: false},
         {id: v1(), title: 'Vue', isDone: false},
         {id: v1(), title: 'Angular', isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: 'Rest API', isDone: true},
         {id: v1(), title: 'GraphQL', isDone: false},
         {id: v1(), title: 'TypeScript', isDone: true},
         {id: v1(), title: 'EventLoop', isDone: false},
      ],
   });

   console.log(todolists)
   console.log(tasks)

   const removeTask = (todoId: string, taskId: string) => {
      setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)});
   };

   const addTask = (todoId: string, title: string) => {
      const newTask = {id: v1(), title, isDone: false};
      setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
   };

   const changeFilter = (todoId: string, filter: FilterValuesType) => {
      setTodolists(todolists.map(tl => tl.id === todoId ? {...tl, filter} : tl));
   };

   const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
      setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title} : t)});
   };

   const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
      setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, isDone} : t)});
   };

   const removeTodolist = (todoId: string) => {
      setTodolists(todolists.filter(tl => tl.id !== todoId));

      delete tasks[todoId];
      setTasks({...tasks});
   }

   return (
      <div className="App">
         {
            todolists.map(tl => {

               let tasksForTodolist = tasks[tl.id];

               if (tl.filter === "active") {
                  tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
               }
               if (tl.filter === "completed") {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
               }

               return <Todolist key={tl.id}
                                todoId={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeTaskStatus}
               />
            })
         }
      </div>
   );
}

export default App;