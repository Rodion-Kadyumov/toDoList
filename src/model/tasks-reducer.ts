import { v1 } from 'uuid'
import { TasksStateType } from '../AppWithRedux'
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from './todolists-reducer'

export type RemoveTaskActionsType = {
  type: "REMOVE-TASK"
  taskId: string
  todolistId: string
}

export type AddActionsType = {
  type: "ADD-TASK"
  todolistId: string
  title: string
}

export type ChangeStatusActionsType = {
  type: "CHANGE-TASK-STATUS"
  todolistId: string
  isDone: boolean
  taskId: string
}

export type ChangeTitleActionsType = {
  type: "CHANGE-TASK-TITLE"
  todolistId: string
  title: string
  taskId: string
}

type ActionsType = RemoveTaskActionsType | AddActionsType | ChangeStatusActionsType | ChangeTitleActionsType | AddTodolistActionType | RemoveTodolistActionType

let initialState: TasksStateType = {
  [todolistId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.taskId)
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todolistId];
      const newTask = {id: v1(), title: action.title, isDone: false}
      const newTasks = [ newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks;
      return  stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state }
      let tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      return  stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state }
      let tasks = stateCopy[action.todolistId];
      let task = tasks.find(t=>t.id === action.taskId)
      if (task) {
        task.title = action.title
      }
      return  stateCopy;
    }

    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.id];
      return stateCopy
    }
    
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionsType => {
  return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export const addTaskAC = (title: string, todolistId: string): AddActionsType => {
  return { type: 'ADD-TASK', title,  todolistId } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionsType => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionsType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId } as const
}