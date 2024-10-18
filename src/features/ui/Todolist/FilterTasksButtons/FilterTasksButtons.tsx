import React, {FC} from 'react';
import {filterButtonsContainerSx} from "../../../todolists/Todolist.styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../../../state/store";
import {changeTodolistFilterAC, FilterValuesType, TodolistDomainType} from "../../../../state/reducers/todolists-reducer";

type Props = {
   todolist: TodolistDomainType
}

export const FilterTasksButtons: FC<Props> = (props) => {
   const {todolist: {id, filter}} = props;

  const dispatch = useAppDispatch();

   const changeFilterTaskHandler = (filterValue: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(id, filterValue))
   }

   return (
      <Box sx={filterButtonsContainerSx}>
         <Button variant={filter === 'all' ? 'outlined' : 'text'}
                 onClick={() => changeFilterTaskHandler("all")}
                 color={'inherit'}>
            All
         </Button>
         <Button variant={filter === 'active' ? 'outlined' : 'text'}
                 onClick={() => changeFilterTaskHandler("active")}
                 color={'primary'}>
            Active
         </Button>
         <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                 onClick={() => changeFilterTaskHandler("completed")}
                 color={'secondary'}>
            Completed
         </Button>
      </Box>
   );
};
