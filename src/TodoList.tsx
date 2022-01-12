import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
type PropsType = {
    title: string,
    id: string
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    removeTask: (id: string, todoListId: string) => void,
    removeTodolist: (id: string) => void,
    addTask: (titleList: string, todoListId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (todoListId: string, newTitleTodoList: string) =>void
};

export function TodoList(props: PropsType) {
    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id);
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id);
    }
    const onRemoveTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title);
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={onRemoveTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id);
                        }
                        const onChangeHandlerTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newTaskStatusValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newTaskStatusValue, props.id);
                        }
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id);
                        }
                        return <li key={t.id} className={t.isDone ? "isDone" : ''}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={onChangeHandlerTaskStatus}/>
                            {
                                t.isDone
                                    ? <span>{t.title}</span>
                                    : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            }

                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active_filter" : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active_filter" : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active_filter" : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}