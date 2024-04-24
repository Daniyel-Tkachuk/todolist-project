import React from 'react';
import './App.css';
import {Todolist} from "./components/todolist";

export type TaskType = {
   id: number
   taskTitle: string
   isDone: boolean
}

function App() {

   const todolistTitle_1 = "today";
   const todolistTitle_2 = "tomorrow";

   const tasks_1: TaskType[] = [
      {id: 1, taskTitle: "HTML&CSS", isDone: true},
      {id: 2, taskTitle: "JS", isDone: true},
      {id: 3, taskTitle: "React", isDone: false},
   ]
   const tasks_2: TaskType[] = [
      {id: 4, taskTitle: "Angular", isDone: false},
      {id: 5, taskTitle: "Vue", isDone: false},
      {id: 6, taskTitle: "TypeScript", isDone: false},
   ]

   return (
      <div className="App">
         <Todolist title={todolistTitle_1} tasks={tasks_1}/>
         <Todolist title={todolistTitle_2} tasks={tasks_2}/>
      </div>
   );
}

export default App;
