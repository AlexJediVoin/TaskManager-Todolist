import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Checkbox} from "@material-ui/core";


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
    changeTodoListTitle: (todoListId: string, newTitleTodoList: string) => void
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
                <Button onClick={onRemoveTodolist}>
                    <IconButton onClick={onRemoveTodolist}>
                        <Delete/>
                    </IconButton>
                </Button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                        return <div key={t.id} className={t.isDone ? "isDone" : ''}>
                            <Checkbox checked={t.isDone} color={"primary"}
                                      onChange={onChangeHandlerTaskStatus}></Checkbox>

                            {
                                t.isDone
                                    ? <span>{t.title}</span>
                                    : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            }

                            <Button onClick={onClickHandler}>
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </Button>
                        </div>
                    })
                }
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        color={"success"} variant={props.filter === 'all' ? 'outlined' : 'text'}>All
                </Button>
                <Button
                    onClick={onActiveClickHandler} color={"primary"}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}> Active
                </Button>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler} color={"error"}>Completed
                </Button>
            </div>
        </div>
    )
}