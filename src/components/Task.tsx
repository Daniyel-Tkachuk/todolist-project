import React, {FC, memo, useCallback} from 'react';
import {TaskType} from "../reducers/tasksReducer";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";

type Props = {
   task: TaskType
   onChangeStatus: (taskId: string, checked: boolean) => void
   removeTask: (taskId: string) => void
   updateTaskTitle: (taskId: string, title: string) => void
}

export const Task: FC<Props> = memo((props) => {
   const {
      task: {id, title, isDone},
      onChangeStatus,
      removeTask,
      updateTaskTitle
   } = props;
   console.log("Task")

   const removeTaskHandler = () => {
      removeTask(id);
   };

   const onChangeCheckedHandler = (checked: boolean) => {
      onChangeStatus(id, checked)
   }

   const updateTaskTitleHandler = (title: string) => {
      updateTaskTitle(id, title)
   };

   return (
      <li>
         <CheckBox isDone={isDone}
                   onChangeChecked={onChangeCheckedHandler}
         />
         <EditableSpan title={title}
                       isDone={isDone}
                       updateTitle={updateTaskTitleHandler}
         />
         <Button name="X" onClick={removeTaskHandler} />
      </li>
   );
});
