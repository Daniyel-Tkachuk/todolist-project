import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist";

export type TaskType = {
   id: number
   taskTitle: string
   isDone: boolean
}

export type FilterType = "all" | "active" | "completed";

function App() {

   const todolistTitle = "today";

   const [tasks, setTasks] = useState<TaskType[]>([
      {id: 1, taskTitle: "HTML&CSS", isDone: true},
      {id: 2, taskTitle: "JS", isDone: true},
      {id: 3, taskTitle: "React", isDone: false},
      {id: 4, taskTitle: "Vue", isDone: false},
   ]);

   const [filter, setFilter] = useState<FilterType>("all");


   const removeTask = (taskId: number) => {
      setTasks(tasks.filter(t => t.id !== taskId));
   }

   const changeFilter = (filterValue: FilterType) => {
      setFilter(filterValue);
   }

   const getFilteredTasks = (allTasks: TaskType[], filterValue: FilterType): TaskType[] => {
      switch (filterValue) {
         case "active": {
            return allTasks.filter(t => !t.isDone)
         }
         case "completed": {
            return allTasks.filter(t => t.isDone)
         }
         default: {
            return allTasks;
         }
      }
   }

   const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter);

   return (
      <div className="App">
         <Todolist title={todolistTitle} tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
      </div>
   );
}

export default App;
