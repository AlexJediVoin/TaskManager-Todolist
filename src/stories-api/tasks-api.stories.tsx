import React, {useEffect, useState} from 'react'
import {tasksAPI, TaskStatuses, TodoTaskPriorities} from "../api/tasks-api";

export default {
    title: 'API'
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       let todolistid='6fdfde7a-754e-4b08-b083-07b67856bd19';
       tasksAPI.getTasks(todolistid,2,2).then((res)=>{
           console.log(res)
           setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistid='7630acc0-4b5b-4349-8e46-e65510811b86';
    useEffect(() => {
        tasksAPI.createTask(todolistid, "TKK TASK").then((res)=>{setState(res.data.data.item.title)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bbc609f4-d085-46ef-b343-a99cfdb0c0fd';
        const taskid = '4caa29f1-c99f-4320-ad5c-85e5bb257d06'
        tasksAPI.deleteTask(taskid,todolistId).then((res)=>{setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

/*export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
            useEffect(() => {
                const todolistId = '7aa5b0ca-73b7-4083-b071-c989ccf64473';
                const taskid = '40f5410b-fadc-45a5-8b90-363a109875ca';
                const payload = {
                    title: "sssddd",
                    startDate: "",
                    priority: TodoTaskPriorities.Low,
                    description: "",
                    deadline: "",
                    status: TaskStatuses.New
                };
                tasksAPI.updateTask(todolistId, taskid, payload).then((res) => {

                        setState(res.data)
                    })
            }, [])
        return <div> {JSON.stringify(state)}</div>
}*/

