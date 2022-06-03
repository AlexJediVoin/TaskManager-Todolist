import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistAType, RemoveTodolistAType, todoListId1, todoListId2} from "./todolists-reducer";

type AddTaskAType =
    {
        type: "ADD-TASK"
        payload:
            {
                newTitle: string
                todolistId: string
            }
    }

type RemoveTaskAType =
    {
        type: "REMOVE-TASK"
        payload:
            {
                taskId: string
                todolistId: string
            }
    }

export type ChangeTaskStatusAType =
    {
        type: "CHANGE-TASK-STATUS"
        payload:
            {
                taskId: string
                isDone: boolean
                todolistId: string
            }
    }

export type ChangeTaskTitleAType =
    {
        type: "CHANGE-TASK-TITLE"
        payload:
            {
                taskId: string
                newTitle: string
                todolistId: string
            }
    }
type ActionType =
    AddTaskAType
    | RemoveTaskAType
    | ChangeTaskStatusAType
    | ChangeTaskTitleAType
    | AddTodolistAType
    | RemoveTodolistAType;

const InitialState: TaskStateType = {
    [todoListId1]:
        [
            {id: v1(), title: "HTML&&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
    [todoListId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React book", isDone: true}
    ]
};

export const tasksReducer = (state = InitialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let stateCopy = {...state};
            let task = {id: v1(), title: action.payload.newTitle, isDone: false};
            let taskList = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = [...taskList, task];
            return stateCopy;
        }

        case "REMOVE-TASK": {
            let stateCopy = {...state};
            stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            return stateCopy;
        }

        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state};
            let taskList = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = taskList.map(t => t.id === action.payload.taskId ? {
                ...t,
                isDone: action.payload.isDone
            } : t)
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state};
            let taskList = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = taskList.map(t => t.id === action.payload.taskId ? {
                ...t,
                title: action.payload.newTitle
            } : t)
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            let stateCopy = {...state};
            stateCopy[action.payload.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            let {[action.payload.todolistId]: [], ...rest} = {...state};
            return rest;
        }

        default:
            return state;
    }
}

export const AddTaskAC = (newTitle: string, todolistId: string): AddTaskAType =>
    (
        {
            type: "ADD-TASK", payload:
                {
                    newTitle, todolistId
                }
        }
    ) as const;
export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskAType =>
    (
        {
            type: "REMOVE-TASK",
            payload: {taskId, todolistId}
        }
    ) as const;
export const ChangeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleAType =>
    (
        {
            type: "CHANGE-TASK-TITLE", payload:
                {
                    taskId,
                    newTitle,
                    todolistId
                }
        }
    ) as const;
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAType =>
    (
        {
            type: "CHANGE-TASK-STATUS",
            payload:
                {
                    taskId, isDone, todolistId
                }
        }
    ) as const;