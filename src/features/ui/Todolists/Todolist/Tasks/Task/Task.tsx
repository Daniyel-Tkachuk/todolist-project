import React, {ChangeEvent, FC} from 'react'
import {EditableSpan} from "../../../../../../common/components";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {removeTaskTC, TaskDomainType, updateTaskTC} from "../../../../../model/tasksReducer";
import {TodolistDomainType} from "../../../../../model/todolistsReducer";
import ListItem from "@mui/material/ListItem";
import {useAppDispatch} from "../../../../../../common/hooks";
import {TaskStatuses} from "../../../../../../common/enums";
import {RequestStatusType} from "../../../../../../app/appReducer";


type Props = {
   task: TaskDomainType
   todolist: TodolistDomainType
}
export const Task: FC<Props> = ({todolist, task}) => {
   const dispatch = useAppDispatch();

   const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const isDone = e.currentTarget.checked;
      const status = isDone ? TaskStatuses.Completed : TaskStatuses.New;

      dispatch(updateTaskTC(todolist.id, task.id, {status}));
   }

   const changeTaskTitleHandler = (title: string) => {
      dispatch(updateTaskTC(todolist.id, task.id, {title}));
   }

   const removeTaskHandler = () => {
      dispatch(removeTaskTC(todolist.id, task.id));
   }

   const isTaskDisabled = (taskEntityStatus: RequestStatusType, todolistEntityStatus: RequestStatusType): boolean => {
      return taskEntityStatus === "loading" || todolistEntityStatus === "loading";
   }

   const disabledTask = isTaskDisabled(task.entityStatus, todolist.entityStatus);

   return (
      <ListItem>
         <div>
            <Checkbox
               checked={task.status === TaskStatuses.Completed}
               color="primary"
               onChange={changeTaskStatusHandler}
               disabled={disabledTask}
            />
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabledTask}/>
         </div>
         <IconButton onClick={removeTaskHandler} disabled={disabledTask}>
            <Delete/>
         </IconButton>
      </ListItem>
   )
}
