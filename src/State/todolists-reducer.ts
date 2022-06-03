import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type AddTodolistAType =
    {
        type: "ADD-TODOLIST"
        payload:
            {
                title: string
                id: string
            }
    }

export type RemoveTodolistAType =
    {
        type: "REMOVE-TODOLIST"
        payload:
            {
                todolistId: string
            }
    }

export type ChangeTodoListTitleAType =
    {
        type: "CHANGE-TODOLIST-TITLE"
        payload:
            {
                todolistId: string
                newTitle: string
            }
    }

export type ChangeTodolistFilterAType =
    {
        type: "CHANGE-TODOLIST-FILTER"
        payload:
            {
                todolistId: string
                filter: FilterValuesType
            }
    }
type ActionType =
    AddTodolistAType
    | RemoveTodolistAType
    | ChangeTodoListTitleAType
    | ChangeTodolistFilterAType;

export const  todoListId1:string = v1();
export const todoListId2:string = v1();

const InitialState: Array<TodoListType> =
[
    {
        id: todoListId1,
        title: "What to learn",
        filter: 'all'
    },
    {
        id: todoListId2,
        title: "What to buy",
        filter: 'all'
    }
];

export const todolistsReducer = (state = InitialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}];
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.todolistId);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTitle
            } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)
        default:
            return state;
    }
}

export const AddTodolistAC = (title: string): AddTodolistAType =>
    (
        {
            type: "ADD-TODOLIST",
            payload:
                {
                    title,
                    id: v1()
                }
        }
    ) as const;
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAType =>
    (
        {
            type: "REMOVE-TODOLIST",
            payload:
                {
                    todolistId
                }
        }
    ) as const;
export const ChangeTodoListTitleAC = (todolistId: string, newTitle: string): ChangeTodoListTitleAType =>
    (
        {
            type: "CHANGE-TODOLIST-TITLE",
            payload:
                {
                    todolistId, newTitle
                }
        }
    ) as const;
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterAType =>
    (
        {
            type: "CHANGE-TODOLIST-FILTER",
            payload:
                {
                    todolistId, filter
                }
        }
    ) as const;