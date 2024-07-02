import React, {ChangeEvent, KeyboardEvent, FC, useState, memo} from 'react';


type Props = {
   title: string
   isDone?: boolean
   updateTitle: (title: string) => void
}

export const EditableSpan: FC<Props> = memo((props) => {
   const {title, isDone, updateTitle} = props;
   console.log("EditableSpan")
   const [newTitle, setTitle] = useState<string>(title);
   const [edit, setEdit] = useState<boolean>(false);


   const editHandler = () => {
      setEdit(!edit);
      edit && updateTitle(newTitle);
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && editHandler();
   }

   const stylesForSpan = isDone ? "task-done" : "task";

   return (
      <>
         {
            edit
               ? <input type="text"
                        value={newTitle}
                        autoFocus
                        onChange={onChangeHandler}
                        onBlur={editHandler}
                        onKeyDown={onClickEnter}
               />
               : <span className={stylesForSpan}
                       onDoubleClick={editHandler}
               >{title}</span>
         }
      </>
   );
});
