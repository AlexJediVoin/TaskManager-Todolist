import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

import {TasksStateType} from "../Components/AppWithRedux/AppWithRedux";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/tasks-api";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {
                id: "2", title: "JS", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {
                id: "3", title: "React", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "milk", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "tea", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            }
        ]
    };
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC({
    id: "4", title: "uuuu", description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TodoTaskPriorities.Low,
        startDate: " ",
        deadline: " ",
        todoListId: "todolistId2",
        order: 0,
        addedDate: " "
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("uuuu");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);

})
test('correct task should be removed to correct array', () => {
    const action = removeTaskAC("3", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every((t: TaskType) => t.id !== "3")).toBeTruthy()
    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);

})

test('status of specified task should be changed', () => {
    const startState2: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "JS", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "React", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            }
        ],
        "todolistId2": [
            {id: "1", title: "bread", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "milk", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "tea", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            }
        ]
    };

    const action1 = changeTaskStatusAC("2",TaskStatuses.Completed , "todolistId1");
    const action2 = changeTaskStatusAC("3", TaskStatuses.Completed, "todolistId2");

    const endState1 = tasksReducer(startState, action1)
    const endState2 = tasksReducer(startState2, action2)
    expect(endState1).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "JS", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "React", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            }
        ],
        "todolistId2": [
            {id: "1", title: "bread", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "milk", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "tea", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            }
        ]
    });
    expect(endState2).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "JS", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "React", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId1",
                order: 0,
                addedDate: " "
            }
        ],
        "todolistId2": [
            {id: "1", title: "bread", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "2", title: "milk", description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            },
            {id: "3", title: "tea", description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: " ",
                deadline: " ",
                todoListId: "todolistId2",
                order: 0,
                addedDate: " "
            }
        ]
    })
});


test('change task title should to be correct', () => {
    const action = changeTaskTitleAC("1", "HTML", "todolistId1");
    const endState = tasksReducer(startState, action)

    //expect(endState["todolistId2"].every(t => t.id !=="3")).toBeTruthy()
    expect(endState["todolistId1"][0].title).toBe("HTML");
    expect(endState["todolistId2"][1].title).toBe("milk");

})
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: '5',
        addedDate: '',
        order: 0,
        title: 'adf'
    });
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



