import React, {useState} from 'react';
import './AppWithRedux.module.css';
/*
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function ButtonAppBar() {
    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: 'all'
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: 'all'
        }
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId1]:
            [
                {id: v1(), title: "HTML&&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React book", isDone: true}
        ]
    })

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function removeTodolist(id: string) {
        setTodoLists(todoLists.filter(t => t.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    const changeTodolistFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    const changeTodoListTitle = (todoListId: string, newTitleTodoList: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.title = newTitleTodoList;
            setTodoLists([...todoLists]);
        }
    }
    const addTask = (newTitle: string, todolistId: string) => {
        let task = {id: v1(), title: newTitle, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }
    const addTodoList = (title: string) => {
        let newTodoListId = v1();
        setTodoLists([...todoLists, {id: newTodoListId, title: title, filter: "all"}])
        setTasks({...tasks, [newTodoListId]: []})
    }
    return (
        <div className={"App"}>

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

            <Container fixed style={{padding: "3px", margin:"0 10px"}}>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let taskForTodoList = allTodolistTasks;

                            if (tl.filter === 'active') {
                                taskForTodoList = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                taskForTodoList = allTodolistTasks.filter(t => t.isDone);
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        removeTodolist={removeTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTodolistFilter={changeTodolistFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>

        </div>
    );
}
*/

/*export default App;*/
