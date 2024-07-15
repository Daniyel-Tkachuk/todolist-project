import type {Meta, StoryObj} from '@storybook/react';
import '../App.css';
import {Task} from "../components/Task";
import {fn} from "@storybook/test";
import {useState} from "react";
import {action} from "@storybook/addon-actions";

const meta = {
   title: 'Todolist/Task',
   component: Task,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   argTypes: {
      onChangeStatus: {
         description: "on change status",
      },
      removeTask: {
         description: "remove task",
      },
      updateTaskTitle: {
         description: "update task title",
      },
   },
   args: {
      task: {id: "id-task", title: "React-redux", isDone: false},
      onChangeStatus: fn(),
      removeTask: fn(),
      updateTaskTitle: fn()
   },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;


export const TaskIsDone: Story = {
   args: {
      task: {id: "isDone", title: "React", isDone: true},
   }
}

export const TaskIsNotDone: Story = {
   args: {
      task: {id: "notDone", title: "React-redux", isDone: false}
   }
}

export const TaskDemo: Story = {
   render: (args) => {
      const [task, setTask] = useState({id: "id-demo", title: "demo task", isDone: false});

      const onChangeStatus = () => {
         setTask({...task, isDone: !task.isDone})
         action("isDone")(!task.isDone);
      };

      const updateTaskTitle = (_taskId: string, title: string) => {
         setTask({...task, title})
         action("new title")(title);
      }

      return <Task {...args} task={task}
                   onChangeStatus={onChangeStatus}
                   updateTaskTitle={updateTaskTitle}
      />
   }
}


