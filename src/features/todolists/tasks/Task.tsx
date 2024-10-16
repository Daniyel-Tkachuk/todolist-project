import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../../api/todolists-api'
import {TaskDomainType} from "../../../state/reducers/tasks-reducer";


type TaskPropsType = {
   task: TaskDomainType
   todolistId: string
   changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
   removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
   const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
   }, [props.task.id, props.todolistId]);

   const onTitleChangeHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
   }, [props.task.id, props.todolistId]);

   const disabledTask = props.task.entityStatus === "loading";

   return (
      <>
         <div>
            <Checkbox
               checked={props.task.status === TaskStatuses.Completed}
               color="primary"
               onChange={onChangeHandler}
               disabled={disabledTask}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} disabled={disabledTask}/>
         </div>
         <IconButton onClick={onClickHandler} disabled={disabledTask}>
            <Delete/>
         </IconButton>
      </>
   )
})
