import { v1 } from "uuid"
import { TodoListType } from "../AppWithRedux"
import { todolistReducer, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, removeTodolistAC } from "./todolists-reducer"

test ("correct todolist should be removed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TodoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test ('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TodoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]

  const newTitle = "New todo"

  const endState = todolistReducer(startState, addTodolistAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTitle)
  expect(endState[2].filter).toBe("all")
})

test ('correct todolist should change its name', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TodoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]

  const newTitle = "New todo"

  const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, newTitle))

  expect(endState[0].title).toBe(newTitle)
  expect(endState[1].title).toBe("What to buy")
})

test ('correct filter of todolist should be changed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: TodoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]

  const newFilter = "active";

  const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

// test('correct filter of todolist should be changed', () => {

//   let todolistId1 = v1()
//   let todolistId2 = v1()

//   const startState: TodoListType[] = [
//     {id: todolistId1, title: "What to learn", filter: "all"},
//     {id: todolistId2, title: "What to buy", filter: "all"},
//   ]

//   const newFilter = "all"
//   const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

//   expect(endState[0].filter).toBe("all")
//   expect(endState[1].filter).toBe(newFilter)
// })