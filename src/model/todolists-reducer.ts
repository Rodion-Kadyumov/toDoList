import { v1 } from 'uuid'
import { FilterValueType, TodoListType } from '../AppWithRedux'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  todolistId: string
  title: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todolistId: string
  filter: FilterValueType
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export let todolistId1 = v1()
export let todolistId2 = v1()

let initialState: TodoListType[] = [
  {id: todolistId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(t => t.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [
        {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      },  ...state ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(t => t.id === action.id)
      if(todolist) {
        todolist.title = action.title
      }
      return [ ...state ]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todoList = state.find(t => t.id === action.todolistId)
      if(todoList) {
        todoList.filter = action.filter
      }
      return [ ...state ]
    }
    default:
      return state
  }
}

// Создание функций, задача которых из принятых параметров сформировать правильный объект

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => { // Action Creater
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1() } as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const
}