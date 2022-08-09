import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "./../State/tasks-reducer";
import {todolistsReducer} from './../State/todolists-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {v1} from "uuid";
import {AppRootStateType, store} from "../State/store";
import {TaskStatuses, TodoTaskPriorities} from "../api/tasks-api";
import {appReducer, RequestStatusType} from "../State/app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '',
            order: 0,entityStatus: 'loading'
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '',
            order: 0,entityStatus: 'loading'
        }
    ],
    app: {
        status: "loading",
        error: null
    },
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'REDUX', status: TaskStatuses.Completed,
                addedDate: " ",
                completed: false,
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                description: 'New task',
                todoListId: 'todolistId1'
            },
            {
                id: v1(), title: 'NODE.JS', status: TaskStatuses.Completed,
                addedDate: " ",
                completed: false,
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                description: 'New task',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed,
                addedDate: " ",
                completed: false,
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                description: 'New task',
                todoListId: 'todolistId2'
            },
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed,
                addedDate: " ",
                completed: false,
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                description: 'New task',
                todoListId: 'todolistId2'
            }
        ]
    }
}
// непосредственно создаём store
export const storyBookStore = createStore(rootReducer, initialGlobalState)
// определить автоматически тип всего объекта состояния
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)