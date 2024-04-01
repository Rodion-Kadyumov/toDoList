import { Button } from "./Button"

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type ListProps = {
  title: string
  tasks: TaskType[]
}

export const ToDoList = ({ title, tasks }: ListProps) => {
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
              </li>
            )
          })}
        </ul>
      )}
      <div className="btn">
        <Button title={"All"} />
        <Button title={"Active"} />
        <Button title={"Completed"} />
      </div>
    </div>
  );
}