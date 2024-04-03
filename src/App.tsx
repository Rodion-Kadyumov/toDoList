import './App.css';
import { TaskType, ToDoList } from './components/ToDoList';
import React, { useState } from 'react';

export type FilterValueType = "all" | "active" | "complited"

function App() {

  const [filter, setFilter] = useState<FilterValueType>('all')

  let [tasks, setTasks] = useState<TaskType[]> ([
    {id:1, title: 'HTML&CSS', isDone: true},
    {id:2, title: 'JS', isDone: true},
    {id:3, title: 'ReactJS', isDone: false},
    {id:4, title: 'Redux', isDone: false},
    {id:5, title: 'TS', isDone: false},
    {id:6, title: 'RTK qerry', isDone: false},
  ])

  const removeTask = (taskId: number) => {
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
                  changeFilter={changeFilter} />
      </div>
    </div>
  );
}

export default App;