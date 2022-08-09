import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {TasksStateType} from "../Components/AppWithRedux/AppWithRedux";
import {AppRootStateType, AppThunk} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


export type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

//action creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await tasksAPI.getTasks(todolistId);
        const tasks = res.data.items;
        dispatch(setAppStatusAC('succeeded'));
        const action = setTasksAC(tasks, todolistId);
        dispatch(action);
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
}

export const removeTasksTC = (taskID: string, todolistId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await tasksAPI.deleteTask(taskID, todolistId);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'));
            let action = removeTaskAC(taskID, todolistId)
            dispatch(action);
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.resultCode === 0) {
                const task = res.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const changeTasksTitleTC = (todolistId: string, title: string, taskId: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    dispatch(setAppStatusAC('loading'));
    if (task) {
        if (title.length >= 100) {
            dispatch(setAppErrorAC('Length title must be < 100 symbol!'));
            dispatch(setAppStatusAC('failed'))
        } else {
            try {
                const res = await tasksAPI.updateTask(todolistId, taskId, {
                    title: title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status,
                    completed: task.completed
                })
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'));
                    const action = changeTaskTitleAC(taskId, title, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            } catch (error: any) {
                handleServerNetworkError(error, dispatch)
            }
        }
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            dispatch(setAppStatusAC('loading'));
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status,
                completed: task.completed
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'));
                    const action = changeTaskStatusAC(taskId, status, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
        }
    }

