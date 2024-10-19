import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBox from '@mui/icons-material/AddBox';


type Props = {
   disabled?: boolean
   addItem: (title: string) => void
}

export const AddItemForm: FC<Props> = (props) => {
   const {disabled, addItem} = props;

   let [title, setTitle] = useState('')
   let [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== '') {
         addItem(title);
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
         addItemHandler();
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
                    disabled={disabled}
         />
         <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
            <AddBox fontSize={"large"}/>
         </IconButton>
      </div>
   )
}