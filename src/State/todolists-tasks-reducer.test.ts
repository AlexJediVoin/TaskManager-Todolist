import {TaskStateType, TodoListType} from "../AppWithRedux";

import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});
