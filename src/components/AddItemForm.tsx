import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';


export type AddItemFormProps = {
   addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormProps> = memo((props) => {
   const {addItem} = props;

   const [taskTitle, setTaskTitle] = useState<string>("");
   const [error, setError] = useState<string>("");

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(e.currentTarget.value);
      setError("");
   };

   const onClickHandler = () => {
      const newTitle = taskTitle.trim();
      if (newTitle !== "") {
         addItem(taskTitle);
      } else {
         setError("Title is required");
      }
      setTaskTitle("");
   };

   const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === "Enter" && onClickHandler();
   };

   return (
      <div>
         <input type="text"
                className={`input ${error ? "input-error" : ""}`}
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyDown={onClickEnter}
         />
         <button onClick={onClickHandler}>+</button>
         {error && <div className={"errorMessage"}>{error}</div>}
      </div>
   );
});
