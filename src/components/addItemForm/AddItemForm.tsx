import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBox from '@mui/icons-material/AddBox';


type AddItemFormPropsType = {
   disabled?: boolean
   addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
   console.log('AddItemForm called')

   let [title, setTitle] = useState('')
   let [error, setError] = useState<string | null>(null)

   const addItem = () => {
      if (title.trim() !== '') {
         props.addItem(title);
         setTitle('');
      } else {
         setError('Title is required');
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }
      if (e.key === "Enter") {
         addItem();
      }
   }

   return (
      <div style={{display: "flex", alignItems: "center"}}>
         <TextField variant="outlined"
                    error={!!error}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    label={error ? error : "Title"}
                    disabled={props.disabled}
         />
         <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
            <AddBox fontSize={"large"}/>
         </IconButton>
      </div>
   )
})