import React, {ChangeEvent} from 'react';
import styles from './AppWithRedux.module.css';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Checkbox} from "@material-ui/core";
import {TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./State/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodoListTitleAC, RemoveTodolistAC} from "./State/todolists-reducer";

export type  TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
type PropsType = {
    todolist: TodoListType
};

export function TodoListWithTasks({todolist}: PropsType) {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    const dispatch = useDispatch();

    if (todolist.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTask = (newTaskTitle: string) => {
        dispatch(AddTaskAC(newTaskTitle, todolist.id));
    }

    const onAllClickHandler = () => {
        dispatch(ChangeTodolistFilterAC(todolist.id, 'all'));
    }
    const onActiveClickHandler = () => {
        dispatch(ChangeTodolistFilterAC(todolist.id, 'active'));
    }
    const onCompletedClickHandler = () => {
        dispatch(ChangeTodolistFilterAC(todolist.id, 'completed'));
    }
    const onRemoveTodolist = () => {
        dispatch(RemoveTodolistAC(todolist.id));
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAC(todolist.id, title));
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} changeTitle={changeTodoListTitle}/>

                <IconButton onClick={onRemoveTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks.map(t => {
                        const onClickHandler = () => {
                            dispatch(RemoveTaskAC(t.id, todolist.id));
                        }
                        const onChangeHandlerTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newTaskStatusValue = e.currentTarget.checked;
                            dispatch(ChangeTaskStatusAC(t.id, newTaskStatusValue, todolist.id));
                        }
                        const changeTaskTitle = (newTitle: string) => {
                            dispatch(ChangeTaskTitleAC(t.id, newTitle, todolist.id))
                        }
                        return <div key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <Checkbox checked={t.isDone} color={"primary"}
                                      onChange={onChangeHandlerTaskStatus}></Checkbox>

                            {
                                t.isDone
                                    ? <span>{t.title}</span>
                                    : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            }
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        color={"success"} variant={todolist.filter === 'all' ? 'outlined' : 'text'}>All
                </Button>
                <Button
                    onClick={onActiveClickHandler} color={"primary"}
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}> Active
                </Button>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler} color={"error"}>Completed
                </Button>
            </div>
        </div>
    )
}