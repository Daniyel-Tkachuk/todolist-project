import React, {FC} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
   addTodolistAC,
   TodolistType,
} from "./reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Dispatch} from "redux";


export const App: FC = () => {
   const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists);
   const dispatch = useDispatch<Dispatch>();

   const addTodolist = (title: string) => {
      dispatch(addTodolistAC(title))
   }

   return (
      <div className="App">
         <div>
            <span>Add new todolist</span>
            <AddItemForm onClick={addTodolist}/>
         </div>
         <div className={"todolistsWrapper"}>
            {
               todolists
               && todolists
                  .map(tl => <Todolist key={tl.id} todolist={tl}/>)
            }
         </div>
      </div>
   );
}

// old state
/*const [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
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
  });*/