import axios, {AxiosResponse} from 'axios'
import {FilterValuesType, TodolistDomainType} from "../State/todolists-reducer";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2aa454df-5c09-4e9d-a457-e6e882c52689'
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type MainTodolistType = TodolistType | {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
}

export type RequestUpdateTodolistType = {
    title: string
}
export type RequestDeleteTodolistType = {
    todolistId: string
}

export type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type objectTodolistType = {
    id: string,
    addedDate: Date,
    title: string,
    order: number,
}

export type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

export type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}


export type getTodolistResponseType = Array<objectTodolistType>;

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<RequestUpdateTodolistType, ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<RequestDeleteTodolistType, ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists/`)
        return promise
    },
    createTodolist(title: string) {
        //const promise = instance.post<RequestCreateTodolistType, ResponseType<{item: TodolistType}>>(`todo-lists/`, {title: title})
        const promise = instance.post<AxiosResponse<ResponseType<{ item: TodolistType }>>>(`todo-lists/`, {title: title})
        return promise
    }
}