import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../Components/AppWithRedux/AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({

        id: '1',
        addedDate: '',
        order: 0,
        title: 'add',

    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
