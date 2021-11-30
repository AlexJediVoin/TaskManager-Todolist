import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
    let [tasks, setTasks] = useState(
        [
            { id: v1(), title: "HTML&&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false }
        ]
    )

    function removeTask (taskID: string) {
        let filteredTask = tasks.filter(t => t.id != taskID);
        setTasks(filteredTask);
    }

    let [filter,setFilter] = useState<FilterValuesType>('all');
    let taskForTodoList = tasks;

    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter( t => t.isDone === true);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
    const addTask = (newTitle: string) => {
        let task = {id: v1(), title: newTitle, isDone: false};
        let newTasks = [task,...tasks];
        setTasks(newTasks);
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className={"App"}>
            <TodoList title="What to learn"
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}
export default App;
