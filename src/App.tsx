import './App.css';
import { AddItemForm } from './components/04 - Todolist for students/AddItemForm';
import { TaskType, ToDoList } from './components/04 - Todolist for students/ToDoList';
import { useState } from 'react';
import { v1 } from 'uuid';

export type FilterValueType = "all" | "active" | "complited"

type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<TodoListType[]>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const addTask = (title: string, todolistId: string) => {
    let tas = {id: v1(), title: title, isDone: false};
    let task = tasks[todolistId];
    let newTask = [tas, ...task];
    tasks[todolistId] = newTask
    setTasks({ ...tasks })
  }

  const removeTask = (taskId: string, todolistId: string) => {
    let task = tasks[todolistId];
    let filteredTasks = task.filter(t => t.id !== taskId);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks})
}

const addTodolist = (title: string) => {
  const todolistId = v1()
  const newTodolist: TodoListType = { id: todolistId, title: title, filter: 'all' }
  setTodolists([newTodolist, ...todolists])
  setTasks({ ...tasks, [todolistId]: [] })
}

const removeTodolist = (todolistId: string) => {
  const newTodolists = todolists.filter(tl => tl.id !== todolistId)
  setTodolists(newTodolists)
  // удалим таски для тудулиста из стейта где мы храним таски
  delete tasks[todolistId]
  // засетаем в state копию объекта
  setTasks({ ...tasks })
}

  const changeFilter = (filter: FilterValueType, todolistId: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)))
  }

  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let task = tasks[todolistId];
    let tas = task.find(t=> t.id === taskId);
    if(tas) {
      tas.isDone = isDone;
      setTasks({ ...tasks})
    }
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
    }
    setTasks(newTodolistTasks)
  }

  const updateTodolist = (todolistId: string, title: string) => {
    const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
    setTodolists(newTodolists)
  }

  return(
    <div className='App'>

      <AddItemForm addItem={addTodolist} />

      {todolists.map(tl => {

        let tasksForToDoList = tasks[tl.id];
        if (tl.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter(task => !task.isDone)
        }
        if (tl.filter === "complited") {
          tasksForToDoList = tasksForToDoList.filter(task => task.isDone)
        }

        return (
          <ToDoList
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            removeTodolist={removeTodolist}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            updateTask={updateTask}
            updateTodolist={updateTodolist}
          />
        );
      })}
    </div>
  )
}

export default App;