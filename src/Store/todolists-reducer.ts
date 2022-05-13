import {FilterValuesType, TodoListType} from "../App";
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

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...todoLists, {id: action.payload.id, title: action.payload.title, filter: "all"}];
        case "REMOVE-TODOLIST":
            return todoLists.filter(t => t.id !== action.payload.todolistId);
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTitle
            } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)
        default:
            return todoLists;
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