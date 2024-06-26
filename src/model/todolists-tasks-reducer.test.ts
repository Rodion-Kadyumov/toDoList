import { TasksStateType, TodoListType } from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistReducer } from "./todolists-reducer";

test ("id shold be equals", () => {

  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodoListType[] = []

  const action = addTodolistAC("new todolist")
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})