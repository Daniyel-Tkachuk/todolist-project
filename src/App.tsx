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

