import { FilterValueType } from "../App"
import { Button } from "./Button"

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type ListProps = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterValueType) => void
}

export const ToDoList = ({ title, tasks, removeTask, changeFilter }: ListProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <Button title={"+"} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClick={() => removeTask(task.id)} />
              </li>
            )
          })}
        </ul>
      )}
      <div className="btn">
        <Button title={"All"} onClick={() => changeFilter("all")} />
        <Button title={"Active"} onClick={() => changeFilter("active")} />
        <Button title={"Completed"} onClick={() => changeFilter("complited")} />
      </div>
    </div>
  );
}