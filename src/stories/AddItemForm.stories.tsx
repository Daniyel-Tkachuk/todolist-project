import type {Meta, StoryObj} from '@storybook/react';
import {fn, userEvent, within} from '@storybook/test';
import {AddItemForm, AddItemFormProps} from "../components/AddItemForm";
import '../App.css';
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";

const meta = {
   title: 'Todolist/AddItemForm',
   component: AddItemForm,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   argTypes: {
      addItem: {
         description: "Clicked button inside form",
      }
   },
   args: {
      addItem: fn()
   },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormDemo: Story = {};

const AddItemFormErrorHook: FC<AddItemFormProps> = memo((props) => {
   const {addItem} = props;

   const [taskTitle, setTaskTitle] = useState<string>("");
   const [error, setError] = useState<string>("Title is required");

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

export const AddItemFormErrorStories: Story = {
   render: (args) => <AddItemFormErrorHook {...args}/>
}


/*export const AddItemFormErrorStories: Story = {
   play: async ({canvasElement}) => {
      const canvas = within(canvasElement);
      await userEvent.clear(canvas.getByRole("textbox"));
      await userEvent.click(canvas.getByRole("button"));
   }
}*/