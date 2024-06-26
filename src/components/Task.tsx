import React, {FC, memo} from 'react';
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

   return (
      <li>
         <CheckBox checkedValue={isDone}
                   onChangeChecked={(checked: boolean) => onChangeStatus(id, checked)}
         />
         <EditableSpan title={title}
                       isDone={isDone}
                       updateTitle={(title: string) => updateTaskTitle(id, title)}
         />
         <Button textBtn="X" onClick={() => removeTask(id)}/>
      </li>
   );
});
