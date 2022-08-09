import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type changeTodolistsEntityStatusACType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    todolistId: string,
    entityStatus: RequestStatusType
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type TodolistsActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | changeTodolistsEntityStatusACType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'succeeded'
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todolist,
                filter: "all",
                entityStatus: 'succeeded'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.entityStatus = action.entityStatus;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const changeTodolistsEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType): changeTodolistsEntityStatusACType => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus}
}

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));

        const res = await todolistsAPI.getTodolists();
        dispatch(setAppStatusAC('succeeded'));
        dispatch(setTodolistsAC(res));
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
}

export const deleteTodolistsTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistsEntityStatusAC(todolistId, 'loading'))

        const res = await todolistsAPI.deleteTodolist(todolistId);
        if (res.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistsEntityStatusAC(todolistId, 'succeeded'))
            dispatch(removeTodolistAC(todolistId));
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await todolistsAPI.updateTodolist(todolistId, title);
        if (res.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistTitleAC(todolistId, title));
        } else {
            handleServerAppError(res, dispatch)
        }

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTodolistsTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await todolistsAPI.createTodolist(title);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'));
            dispatch(addTodolistAC(res.data.data.item));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
