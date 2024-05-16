import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';


type Props = {
   onClick: (title: string) => void
}

export const AddItemForm: FC<Props> = (props) => {
   const {onClick} = props;

   const [taskTitle, setTaskTitle] = useState<string>("");
   const [error, setError] = useState<string>("");

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(e.currentTarget.value);
      setError("");
   };

   const onClickHandler = () => {
      const newTitle = taskTitle.trim();
      if (newTitle !== "") {
         onClick(taskTitle);
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
};
