import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "./../State/tasks-reducer";
import {todolistsReducer} from './../State/todolists-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {v1} from "uuid";
import {AppRootStateType, store} from "../State/store";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}
// непосредственно создаём store
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
// определить автоматически тип всего объекта состояния
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)