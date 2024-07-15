import type {Meta, StoryObj} from '@storybook/react';
import {fn, userEvent, within} from '@storybook/test';
import {AddItemForm} from "../components/AddItemForm";
import '../App.css';

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

export const AddItemFormErrorStories: Story = {
   play: async ({canvasElement}) => {
      const canvas = within(canvasElement);
      await userEvent.clear(canvas.getByRole("textbox"));
      await userEvent.click(canvas.getByRole("button"));
   }
}
