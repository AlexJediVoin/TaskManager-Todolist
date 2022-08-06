import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskStatuses, TodoTaskPriorities} from "../../api/tasks-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    todolistId: "dsds",
    removeTask: action("removeTask"),
    changeTaskStatus:action("changeTaskStatus"),
    changeTaskTitle: action("changeTaskTitle")
  }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  task: {id: "12" , title: 'JS', status: TaskStatuses.Completed,
    addedDate: " ",
    completed: false,
    order: 0,
    priority: TodoTaskPriorities.Low,
    startDate: " ",
    deadline: " ",
    description: 'New task',
    todoListId: 'dsds',
}}
TaskIsNotDoneStory.args = {
  task: {id: "125" , title: 'CSS', status: TaskStatuses.New,
    addedDate: " ",
    completed: false,
    order: 0,
    priority: TodoTaskPriorities.Low,
    startDate: " ",
    deadline: " ",
    description: 'New task',
    todoListId: 'todolistId2',
}};