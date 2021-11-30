import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css'

type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
type PropsType = {
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilter: (value: FilterValuesType) => void,
    removeTask: (taskID: string) => void,
    addTask: (titleList: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void
};

export function TodoList(props: PropsType) {
    let [titleList, setTitle] = useState("");
    let [error, setError] = useState <string | null>(null);
    const addTask = () => {
        if (titleList.trim() != ''){
            props.addTask(titleList);
            setTitle('');
            setError(null);
        }
        else {
            setError('Заполни строку!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={titleList}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error_message"}>Заполни строку!</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id);
                        }
                        const onChangeHandlerTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newTaskStatusValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newTaskStatusValue);
                        }
                        return <li key={t.id} className={t.isDone ? "isDone" : ''}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={onChangeHandlerTaskStatus}/> <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active_filter": ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? "active_filter" : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? "active_filter" : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}