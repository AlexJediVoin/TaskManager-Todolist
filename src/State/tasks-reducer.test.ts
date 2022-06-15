import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskStateType} from "../Components/AppWithRedux/AppWithRedux";
import {TaskType} from "../Components/Todolist/Todolist";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);

})
test('correct task should be removed to correct array', () => {
    const action = removeTaskAC("3", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every((t: TaskType) => t.id !== "3")).toBeTruthy()
    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId2"][1].isDone).toBe(true);

})

test('status of specified task should be changed', () => {
    const startState2: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: true}
        ]
    };

    const action1 = changeTaskStatusAC("2", false, "todolistId1");
    const action2 = changeTaskStatusAC("3", false, "todolistId2");

    const endState1 = tasksReducer(startState, action1)
    const endState2 = tasksReducer(startState2, action2)
    expect(endState1).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    });
    expect(endState2).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
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
    const action = addTodolistAC("new todolist");
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



