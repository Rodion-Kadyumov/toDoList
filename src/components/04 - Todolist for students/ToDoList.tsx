import { FilterValueType } from "../../App"
import { AddItemForm } from "./AddItemForm"
import { Button } from "./Button"
import { useState, ChangeEvent, KeyboardEvent } from "react"
import { EditableSpan } from "./EditableSpan"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  todolistId: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolist: (todolistId: string, title: string) => void
}

export const ToDoList = ({ title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, todolistId, removeTodolist, updateTask, updateTodolist }: PropsType) => {

  let [error, setError] = useState<string | null>(null)

  const addtaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter" && taskTitle && !leng) {
      addTaskHandler()
    }
  }

  const changeFilterTasksHandler = (filter: FilterValueType) => {
    changeFilter(filter, todolistId)
  }

  const [taskTitle, setTaskTitle] = useState('')

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '' && taskTitle !== 'kakashka') {
      addTask(taskTitle.trim(), todolistId)
      setTaskTitle('')
    } else {
      setError("Title is required");
    }
  }

  const leng = taskTitle.length > 15

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const addTaskCallback = (title: string) => {
    addTask(title, todolistId)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title)
  }

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler} />
        </h3>
        <Button title={"x"} onClick={removeTodolistHandler} />
      </div>
      <div>
        <AddItemForm addItem={addTaskCallback} />
        
        { error && <div className="error-messege">{error}</div> }
        {taskTitle.length > 15 && <div>Task is too long</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => removeTask(task.id, todolistId)
            
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, newStatusValue, todolistId)
            }

            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title)
            }

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type="checkbox"
                      checked={task.isDone}
                      onChange={changeTaskStatusHandler}/>
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                  <Button title={"x"} onClick={removeTaskHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div className="btn">
        <Button className={filter === "all" ? "active-filter" : ""} title={"All"} onClick={() => changeFilterTasksHandler("all")} />
        <Button className={filter === "active" ? "active-filter" : ""} title={"Active"} onClick={() => changeFilterTasksHandler("active")} />
        <Button className={filter === "complited" ? "active-filter" : ""} title={"Completed"} onClick={() => changeFilterTasksHandler("complited")} />
      </div>
    </div>
  );
}