import React from 'react';
import styles from './AppWithRedux.module.css';
import {TaskType} from "./TodoListWithTasks";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {
    AddTodolistAC,

} from "./State/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";
import {TodoListWithTasks} from "./TodoListWithTasks";

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

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    let dispatch = useDispatch();

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title);
        dispatch(action);
    }
    return (
        <div className={styles.App}>

            <AppBar position={"static"} style={{width: "400px", height: "60px"}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{padding: "3px", margin: "0 10px"}}>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoListWithTasks
                                        key={tl.id}
                                        todolist={tl}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWitchRedux;
