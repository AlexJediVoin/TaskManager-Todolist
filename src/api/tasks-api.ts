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
type ParamsType = {
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
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

export type ResponseGetTaskType = {
    error: null | string,
    items: TaskType[],
    totalCount: number,
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type updateTaskPayload = {
    title: string
    startDate: string,
    priority: TodoTaskPriorities,
    description: string,
    deadline: string,
    status: TaskStatuses,
    completed: boolean
}

export const tasksAPI = {
    updateTask(todolistId: string, taskId: string, payload: updateTaskPayload) {
        const promise = instance.put<any,AxiosResponse<ResponseType<{ item: TaskType }>>,updateTaskPayload>(`${todolistId}/tasks/${taskId}`,
            {
                title: payload.title,
                startDate: payload.startDate,
                priority: payload.priority,
                description: payload.description,
                deadline: payload.deadline,
                status: payload.status,
                completed: payload.completed,
            }
        )
        return promise
    },
    deleteTask(taskid: string, todolistId: string) {
        const promise = instance.delete<any, AxiosResponse<ResponseType>>(`${todolistId}/tasks/${taskid}`)
        return promise
    },
    getTasks(todolistId: string, count?: number, page?: number) {
        const params: ParamsType = {count: count, page: page};
        const promise = instance.get<ResponseGetTaskType>(`${todolistId}/tasks`, {params})
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<any, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`${todolistId}/tasks`, {title: title}).then(res=> res.data)
        return promise
    }
}