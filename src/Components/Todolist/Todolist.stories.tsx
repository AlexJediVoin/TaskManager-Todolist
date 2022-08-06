import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {TaskStatuses, TodoTaskPriorities} from "../../api/tasks-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action("removeTask"),
        changeFilter: action("changeFilter"),
        addTask: action("addTask"),
        changeTaskStatus: action("changeTaskStatus"),
        removeTodolist: action("removeTodolist"),
        changeTodolistTitle: action("changeTodolistTitle"),
        changeTaskTitle: action("changeTaskTitle")
    }
} as ComponentMeta<typeof Todolist>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistFilterComplete = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistFilterComplete.args = {
    id: 'eee',
    title: 'Lessons',
    tasks: [
        {
            id: v1(), title: 'HTML&CSS', status: TaskStatuses.New,
            addedDate: " ",
            completed: false,
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: " ",
            deadline: " ",
            description: 'New task',
            todoListId: ''
        },
        {
            id: v1(), title: 'JS', status: TaskStatuses.Completed,
            addedDate: " ",
            completed: false,
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: " ",
            deadline: " ",
            description: 'New task',
            todoListId: ''
        }
    ],
    filter: "completed"
};
export const TodolistFilterActive = Template.bind({});
TodolistFilterActive.args = {
    id: 'asd',
    title: 'Books',
    tasks: [
        {
            id: v1(), title: 'REDUX', status: TaskStatuses.Completed,
            addedDate: " ",
            completed: false,
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: " ",
            deadline: " ",
            description: 'New task',
            todoListId: ''
        },
        {
            id: v1(), title: 'NODE.JS', status: TaskStatuses.New,
            addedDate: " ",
            completed: false,
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: " ",
            deadline: " ",
            description: 'New task',
            todoListId: ''
        }
    ],
    filter: "active"
};
