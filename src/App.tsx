import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist";

export type TaskType = {
   id: number
   taskTitle: string
   isDone: boolean
}

function App() {

   const todolistTitle = "today";

   const [tasks, setTasks] = useState<TaskType[]>([
      {id: 1, taskTitle: "HTML&CSS", isDone: true},
      {id: 2, taskTitle: "JS", isDone: true},
      {id: 3, taskTitle: "React", isDone: false},
      {id: 4, taskTitle: "Vue", isDone: false},
   ]);

   const removeTask = (taskId: number) => {
      setTasks(tasks.filter(t => t.id !== taskId));
   }



   return (
      <div className="App">
         <Todolist title={todolistTitle} tasks={tasks} removeTask={removeTask}/>
      </div>
   );
}

export default App;
