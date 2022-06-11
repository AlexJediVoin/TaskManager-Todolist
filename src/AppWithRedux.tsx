import React, {useCallback} from 'react';
import {TaskType} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Container, Grid, Menu, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodoListTitleAC, removeTodolistAC,

} from "./State/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {Todolist} from "./Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWitchRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC(title);
        dispatch(action);
    }, []);

    const removeTask=useCallback((id: string, todolistId: string) =>{
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    },[]);

    const addTask = useCallback((title: string, todolistId: string)=> {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    },[]);

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) =>{
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    },[]);

   const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    },[]);

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string) =>{
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    },[]);

    const removeTodolist=useCallback((id: string)=> {
        const action = removeTodolistAC(id);
        dispatch(action);
    },[]);

    const changeTodolistTitle =useCallback((id: string, title: string) =>{
        const action = changeTodoListTitleAC(id, title);
        dispatch(action);
    },[]);

    const addTodolist = useCallback((title: string)=> {
        const action = addTodolistAC(title);
        dispatch(action);
    },[]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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

export default AppWitchRedux;
