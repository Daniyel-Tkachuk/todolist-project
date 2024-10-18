import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../state/store";
import {getTodolistsTC} from "../state/reducers/todolists-reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolists/Todolist";
import {selectTodolists} from "../model/todolistsSelectors";


type Props = {}

export const Todolists: FC<Props> = (props) => {
   const {} = props;

   const todolists = useAppSelector(selectTodolists);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTodolistsTC());
   }, []);

   return (
      <>
         {
            todolists.map(tl => {
               return (
                  <Grid item key={tl.id}>
                     <Paper sx={{p: '5px 20px 20px 20px'}}>
                        <Todolist
                           todolist={tl}
                        />
                     </Paper>
                  </Grid>
               )
            })
         }
      </>
   )
}