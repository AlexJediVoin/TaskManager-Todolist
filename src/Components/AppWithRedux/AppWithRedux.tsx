import React, {useCallback, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import styles from './AppWithRedux.module.css'
import {Todolist} from "../Todolist/Todolist";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistsTC,
    deleteTodolistsTC,
    fetchTodolistsTC,
    FilterValuesType,
} from '../../State/todolists-reducer';
import {
    addTaskTC,
    changeTasksTitleTC,
    removeTasksTC,
    updateTaskStatusTC,
} from '../../State/tasks-reducer';
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {useAppDispatch, useAppSelector} from "../../State/hooks";

import { Navigate} from 'react-router-dom';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();


    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTasksTC(id, todolistId);
        dispatch(thunk);
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(id, todolistId, status));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTasksTitleTC(todolistId, newTitle, id));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        debugger;
        dispatch(deleteTodolistsTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistsTC(title));
    }, [dispatch]);

    useEffect(() => {
        console.log('isLoginIn: ',isLoggedIn)
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC());
            return
        }

    }, [isLoggedIn]);
    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }
    return (<div className={styles.App}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        entityStatus={tl.entityStatus}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
        </div>)
}

export default AppWithRedux;