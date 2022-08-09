import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {tasksReducer} from "./tasks-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: 'str1',entityStatus: 'loading'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: 'str2',entityStatus: 'loading'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('todolist should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([],action)

    expect(endState.length).toBe(2);
});

test('correct todolist should be added', () => {
    let newTodolist=
        {id: todolistId2, title: "What to buyttt", filter: "all", order: 0, addedDate: 'str2'}


    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to buyttt");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test ('empty arrays should be added when we set todolists',()=>{
    const action = setTodolistsAC([
        {
            id: '1',
            addedDate: '',
            order: 0,
            title: 'ss'
        },
        {
            id: '2',
            addedDate: '',
            order: 0,
            title: 'ssddd'
        }])
    const endState = tasksReducer({},action);
    let keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);

})
