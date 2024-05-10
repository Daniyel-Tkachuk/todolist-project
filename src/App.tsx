import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TodolistType = { id: string, title: string, filter: FilterValuesType };
export type FilterValuesType = "all" | "active" | "completed";

function App() {
   const [todolists, setTodolists] = useState<TodolistType[]>([
      {id: v1(), title: 'What to learn', filter: 'all'},
      {id: v1(), title: 'What to buy', filter: 'completed'},
   ]);
   const [tasks, setTasks] = useState<TaskType[]>([
      {id: v1(), taskTitle: "HTML&CSS", isDone: true},
      {id: v1(), taskTitle: "JS", isDone: true},
      {id: v1(), taskTitle: "ReactJS", isDone: false},
      {id: v1(), taskTitle: "Rest API", isDone: false},
      {id: v1(), taskTitle: "GraphQL", isDone: false},
   ]);

   const removeTask = (taskId: string) => {
      let filteredTasks = tasks.filter(t => t.id !== taskId);
      setTasks(filteredTasks);
   };

   const addTask = (taskTitle: string) => {
      setTasks([{id: v1(), taskTitle, isDone: false}, ...tasks]);
   };

   const changeFilter = (todoId: string, filter: FilterValuesType) => {
      setTodolists(todolists.map(tl => tl.id === todoId ? {...tl, filter} : tl));
   };

   const changeTaskTitle = (taskId: string, taskTitle: string) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, taskTitle} : t));
   };

   const changeTaskStatus = (taskId: string, isDone: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t));
   };

   return (
      <div className="App">
         {
            todolists.map(tl => {

               let tasksForTodolist = tasks;

               if (tl.filter === "active") {
                  tasksForTodolist = tasks.filter(t => !t.isDone)
               }
               if (tl.filter === "completed") {
                  tasksForTodolist = tasks.filter(t => t.isDone)
               }

               return <Todolist key={tl.id}
                                todoId={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                filter={tl.filter}
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