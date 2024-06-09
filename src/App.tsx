import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./reducers/tasksReducer";
import {
   addTodolistAC,
   changeFilterAC, FilterValuesType,
   removeTodolistAC,
   todolistsReducer,
   updateTodolistTitleAC
} from "./reducers/todolistsReducer";


function App() {
   const todolistID1 = v1();
   const todolistID2 = v1();

   const [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'completed'},
   ])

   const [tasks, tasksDispatch] = useReducer(tasksReducer, {
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


   const removeTask = (todoId: string, taskId: string) => {
      tasksDispatch(removeTaskAC(todoId, taskId));
   };

   const addTask = (todoId: string, title: string) => {
      tasksDispatch(addTaskAC(todoId, title));
   };

   const changeFilter = (todoId: string, filter: FilterValuesType) => {
      todolistsDispatch(changeFilterAC(todoId, filter))
   };

   const updateTaskTitle = (todoId: string, taskId: string, title: string) => {
      tasksDispatch(updateTaskTitleAC(todoId, taskId, title));
   };

   const updateTodolistTitle = (todoId: string, title: string) => {
      todolistsDispatch(updateTodolistTitleAC(todoId, title));
   }

   const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
      tasksDispatch(changeTaskStatusAC(todoId, taskId, isDone));
   };

   const removeTodolist = (todoId: string) => {
      const action = removeTodolistAC(todoId);
      todolistsDispatch(action);
      tasksDispatch(action);
   }

   const addTodolist = (title: string) => {
      const action = addTodolistAC(title);
      todolistsDispatch(action);
      tasksDispatch(action);
   }

   return (
      <div className="App">
         <div>
            <span>Add new todolist</span>
            <AddItemForm onClick={addTodolist}/>
         </div>
         <div className={"todolistsWrapper"}>
            {
               todolists && todolists.map(tl => {

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
                                   updateTaskTitle={updateTaskTitle}
                                   updateTodolistTitle={updateTodolistTitle}
                                   changeTaskStatus={changeTaskStatus}
                  />
               })
            }
         </div>
      </div>
   );
}

export default App;