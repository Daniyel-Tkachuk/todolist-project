import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

   const [tasks, setTasks] = useState<TaskType[]>([
      {id: crypto.randomUUID(), taskTitle: "HTML&CSS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "JS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "ReactJS", isDone: false},
      {id: crypto.randomUUID(), taskTitle: "Rest API", isDone: false},
      {id: crypto.randomUUID(), taskTitle: "GraphQL", isDone: false},
   ]);

   const [filter, setFilter] = useState<FilterValuesType>("all");

   const removeTask = (taskId: string) => {
      let filteredTasks = tasks.filter(t => t.id != taskId);
      setTasks(filteredTasks);
   };

   const addTask = (taskTitle: string) => {
      setTasks([{id: crypto.randomUUID(), taskTitle, isDone: false}, ...tasks]);
   };

   const changeFilter = (value: FilterValuesType) => {
      setFilter(value);
   };

   const changeTaskTitle = (taskId: string, taskTitle: string) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, taskTitle} : t));
   };

   const changeTaskStatus = (taskId: string, isDone: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t));
   };


   let tasksForTodolist = tasks;

   if (filter === "active") {
      tasksForTodolist = tasks.filter(t => !t.isDone);
   }
   if (filter === "completed") {
      tasksForTodolist = tasks.filter(t => t.isDone);
   }

   return (
      <div className="App">
         <Todolist title="What to learn"
                   tasks={tasksForTodolist}
                   removeTask={removeTask}
                   changeFilter={changeFilter}
                   addTask={addTask}
                   changeTaskTitle={changeTaskTitle}
                   changeTaskStatus={changeTaskStatus}
         />
      </div>
   );
}

export default App;