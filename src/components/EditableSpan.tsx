import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';

type Props = {
   title: string
   isDone?: boolean
}

export const EditableSpan: FC<Props> = (props) => {
   const {title, isDone} = props;

   const [text, setText] = useState<string>("");
   const [edit, setEdit] = useState<boolean>(false);

   const onDoubleClickHandler = () => {
      setEdit(true);
   };

   const onBlurHandler = () => {
      setEdit(false);
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
   }

   const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && onBlurHandler();
   }

   const stylesForSpan = isDone ? "task-done" : "task";

   return (
      <>
         {
            edit
               ? <input type="text"
                        autoFocus
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        onKeyDown={onClickEnter}
               />
               : <span className={stylesForSpan}
                       onDoubleClick={onDoubleClickHandler}
               >{title}</span>
         }
      </>
   );
};
