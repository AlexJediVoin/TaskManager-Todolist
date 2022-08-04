import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodolist().then((res)=>{setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("KKK").then((res)=>{setState(res.data.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '470b5de1-d44f-4a3c-b0a4-e2d924b199f5';
        todolistAPI.deleteTodolist(todolistId).then((res)=>{setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
            useEffect(() => {
                const todolistId = '6fdfde7a-754e-4b08-b083-07b67856bd19';
                todolistAPI.updateTodolist(todolistId, 'KROGTTT')
                    .then((res) => {

                        setState(res.data)
                    })
            }, [])
        return <div> {JSON.stringify(state)}</div>
}

