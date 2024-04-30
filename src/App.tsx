import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

   let [tasks, setTasks] = useState<TaskType[]>([
      {id: crypto.randomUUID(), taskTitle: "HTML&CSS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "JS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "ReactJS", isDone: false},
      {id: crypto.randomUUID(), taskTitle: "Rest API", isDone: false},
      {id: crypto.randomUUID(), taskTitle: "GraphQL", isDone: false},
   ]);

   function removeTask(id: string) {
      let filteredTasks = tasks.filter(t => t.id != id);
      setTasks(filteredTasks);
   }

   function addTask(taskTitle: string) {
      setTasks([{id: crypto.randomUUID(), taskTitle, isDone: false}, ...tasks]);
   }

   let [filter, setFilter] = useState<FilterValuesType>("all");

   let tasksForTodolist = tasks;

   if (filter === "active") {
      tasksForTodolist = tasks.filter(t => !t.isDone);
   }
   if (filter === "completed") {
      tasksForTodolist = tasks.filter(t => t.isDone);
   }

   function changeFilter(value: FilterValuesType) {
      setFilter(value);
   }


   return (
      <div className="App">
         <Todolist title="What to learn"
                   tasks={tasksForTodolist}
                   removeTask={removeTask}
                   changeFilter={changeFilter}
                   addTask={addTask}/>
      </div>
   );
}

export default App;