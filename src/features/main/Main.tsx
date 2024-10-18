import React, {useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {useAppDispatch} from "../../state/store";
import {addTodolistTC,} from "../../state/reducers/todolists-reducer";
import {Todolists} from "../Todolists";


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



