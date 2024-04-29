import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist";

export type TaskType = {
   id: string
   taskTitle: string
   isDone: boolean
}

export type FilterType = "all" | "active" | "completed";

function App() {

   const todolistTitle = "today";

   const [tasks, setTasks] = useState<TaskType[]>([
      {id: crypto.randomUUID(), taskTitle: "HTML&CSS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "JS", isDone: true},
      {id: crypto.randomUUID(), taskTitle: "React", isDone: false},
      {id: crypto.randomUUID(), taskTitle: "Vue", isDone: false},
   ]);

   const [filter, setFilter] = useState<FilterType>("all");


   const removeTask = (taskId: string) => {
      setTasks(tasks.filter(t => t.id !== taskId));
   }

   const changeFilter = (filterValue: FilterType) => {
      setFilter(filterValue);
   }

   const addTask = (taskTitle: string) => {
      const newTask = {id: crypto.randomUUID(), taskTitle: taskTitle, isDone: false};
      setTasks([newTask, ...tasks])
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
         <Todolist title={todolistTitle}
                   tasks={filteredTasks}
                   removeTask={removeTask}
                   changeFilter={changeFilter}
                   addTask={addTask}
         />
      </div>
   );
}

export default App;
