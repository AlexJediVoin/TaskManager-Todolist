import axios, {AxiosResponse} from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2aa454df-5c09-4e9d-a457-e6e882c52689'
    }
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...settings
})
type ParamsType ={
    count?: number,
    page?: number,
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TodoTaskPriorities,
    startDate: Date,
    deadline: Date,
    id: string,
    todoListId: string,
    order: number,
    addedDate: Date,
}

type ResponseGetTaskType ={
    error: null | string,
    items: TaskType[],
    totalCount: number,
}

type ItemTaskType = {
    item: TaskType[]
}

type TaskTitleType = {
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const tasksAPI = {
    updateTask(todolistId: string, taskid: string, title: string) {
        const promise = instance.put<AxiosResponse<ResponseType<{item: ItemTaskType}>>>(`${todolistId}/tasks/${taskid}`, {title:title})
        return promise
    },
    deleteTask(todolistId: string, taskid: string) {
        const promise = instance.delete<any, AxiosResponse<ResponseType>>(`${todolistId}/tasks/${taskid}`)
        return promise
    },
    getTasks(todolistId: string, count?: number, page?: number) {
        const params: ParamsType = {count: count, page: page};
        const promise = instance.get<ResponseGetTaskType>(`${todolistId}/tasks`, {params})
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<AxiosResponse<ResponseType<{item: ItemTaskType}>>,TaskTitleType >(`${todolistId}/tasks`, {title: title})
        return promise
    }
}