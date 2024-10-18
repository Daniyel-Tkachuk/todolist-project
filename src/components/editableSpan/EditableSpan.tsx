import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
   disabled?: boolean
   value: string
   onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
   const {value, disabled, onChange} = props;

   let [editMode, setEditMode] = useState(false);
   let [title, setTitle] = useState(props.value);

   const activateEditMode = () => {
      setEditMode(true);
   }
   const deactivateEditModeHandler = () => {
      setEditMode(false);
      onChange(title);
   }
   const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   return (
       editMode && !disabled
         ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={deactivateEditModeHandler}/>
         : <span onDoubleClick={activateEditMode}>{value}</span>
   )
};

