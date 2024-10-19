import React, {useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../common/components";
import {useAppDispatch} from "../common/hooks";
import {addTodolistTC,} from "../features/model/todolistsReducer";
import {Todolists} from "../features/ui/Todolists/Todolists";



export const Main = () => {
   const dispatch = useAppDispatch();

   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistTC(title));
   }, [dispatch]);


   return (
      <Container fixed maxWidth={false}>
         <Grid container sx={{m: '30px 0 50px'}}>
            <AddItemForm addItem={addTodolist}/>
         </Grid>
         <Grid container spacing={4}>
           <Todolists/>
         </Grid>
      </Container>
   );
};



