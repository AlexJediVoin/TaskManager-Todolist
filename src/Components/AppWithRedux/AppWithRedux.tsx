import React, {useCallback, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import styles from './AppWithRedux.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
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
import {LinerProgress} from "../Preloader/LinerProgress";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    let status = useAppSelector(state=>state.app.status)
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
        dispatch(deleteTodolistsTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistsTC(title));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);
    return (
        <div className={styles.App}>
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinerProgress/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} disabled={false}/>
                </Grid>
                <Grid container spacing={3}>
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
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;