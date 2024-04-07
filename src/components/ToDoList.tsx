import { FilterValueType } from "../App"
import { Button } from "./Button"
import { useState, ChangeEvent, KeyboardEvent } from "react"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type ListProps = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValueType) => void
  addTask: (title: string) => void
}

export const ToDoList = ({ title, tasks, removeTask, changeFilter, addTask }: ListProps) => {

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addtaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  const changeFilterTasksHandler = (filter: FilterValueType) => {
    changeFilter(filter)
  }

  const [taskTitle, setTaskTitle] = useState('')

  const addTaskHandler = () => {
    addTask(taskTitle)
    setTaskTitle('')
  }
  
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
              value={taskTitle}
              onChange={changeTaskTitleHandler}
              onKeyUp={addtaskOnKeyUpHandler}
              />
        <Button title={"+"} onClick={addTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id)
            }
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClick={removeTaskHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div className="btn">
        <Button title={"All"} onClick={() => changeFilterTasksHandler("all")} />
        <Button title={"Active"} onClick={() => changeFilterTasksHandler("active")} />
        <Button title={"Completed"} onClick={() => changeFilterTasksHandler("complited")} />
      </div>
    </div>
  );
}