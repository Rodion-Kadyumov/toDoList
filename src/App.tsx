import './App.css';
import { TaskType, ToDoList } from './components/ToDoList';
import React, { useState } from 'react';
import { v1 } from 'uuid';

export type FilterValueType = "all" | "active" | "complited"

function App() {

  const addTask = (title: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }
  const [filter, setFilter] = useState<FilterValueType>('all')

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    const newState = tasks.map(t => (t.id == taskId ? { ...t, isDone: taskStatus } : t))
    setTasks(newState)
  }

  let [tasks, setTasks] = useState<TaskType[]> ([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'TS', isDone: false},
    {id: v1(), title: 'RTK qerry', isDone: false},
  ])

  const removeTask = (taskId: string) => {
    const filterTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filterTasks)
  }

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }

  let tasksForToDoList = tasks
  if (filter === "active") {
    tasksForToDoList = tasks.filter(task => !task.isDone)
  }
  if (filter === "complited") {
    tasksForToDoList = tasks.filter(task => task.isDone)
  }
  
  return (
    <div className='App'>
      <div>
        <ToDoList title='What to learn'
                  tasks={tasksForToDoList}
                  removeTask={removeTask} 
                  changeFilter={changeFilter}
                  addTask={addTask} />
      </div>
    </div>
  );
}

export default App;