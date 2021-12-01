import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
type TaskStateType = {
    [key: string]: Array<TaskType>
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
    let [tasks, setTasks] = useState <TaskStateType>({
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

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
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

    return (
        <div className={"App"}>
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
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTodolist={removeTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
