import { TasksStateType } from "../AppWithRedux";
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test ("correct task shold be deleted from correct array", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"));

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy() // Пробегаемся по всему массиву
})

test ("correct task shold be added from correct array", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, addTaskAC("juice", "todolistId2"));

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined() // id была определена
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBe(false)
})

test ("status of specified task shold be changedy", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, changeTaskStatusAC("2", false, "todolistId2"));

  expect(endState["todolistId1"][1].isDone).toBe(true) // toBeTruthy()
  expect(endState["todolistId2"][1].isDone).toBe(false) // toBeFalsy()
})

test ("title of specified task shold be changedy", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, changeTaskTitleAC("2", "Milkyway", "todolistId2"));

  expect(endState["todolistId1"][1].title).toBe("jS")
  expect(endState["todolistId2"][1].title).toBe("Milkyway")
})

test ("new array shold be added when new todolist is added", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, addTodolistAC("new todolist"));

  const keys = Object.keys(endState); // 
  const newKey = keys.find(k=>k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key shold be added")
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test ("property with todolistId shold be deleted", () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "jS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"));

  const keys = Object.keys(endState); //  Пробежимся по всем ключам финального стейта
  
  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined() // toBeUndefined()
})