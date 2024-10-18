import React, {FC} from 'react';
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {updateTodolistTitleTC, removeTodolistTC, TodolistDomainType} from "../../../state/reducers/todolists-reducer";
import {useAppDispatch} from "../../../state/store";


type Props = {
   todolist: TodolistDomainType
}

export const TodolistTitle:FC<Props> = (props) => {
   const {todolist: {id, title, entityStatus}} = props;

   const dispatch = useAppDispatch();

   const removeTodolistHandler = () => {
      dispatch(removeTodolistTC(id));
   }

   const updateTodolistTitleHandler = (title: string) => {
      dispatch(updateTodolistTitleTC(id, title))
   }

   return (
      <div>
         <h3>
            <EditableSpan
               value={title}
               onChange={updateTodolistTitleHandler}
               disabled={entityStatus === "loading"}
            />
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
               <Delete/>
            </IconButton>
         </h3>
      </div>
   );
};
