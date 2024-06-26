import { FilterValueType } from "../../AppWithRedux"
import { AddItemForm } from "./AddItemForm"
import { ChangeEvent } from "react"
import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { Box, Checkbox, List, ListItem } from "@mui/material"
import { filterButtonsContainerSx, getListItemSx } from "../Todolist.styles"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../model/tasks-reducer"
import { AppRootState } from "../../model/store"
import { changeTodolistTitleAC } from "../../model/todolists-reducer"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  changeFilter: (todolistId: string, filter: FilterValueType) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (taskId: string, newTitle: string) => void
  filter: FilterValueType
}

export const ToDoList = ({ title, changeFilter, filter, todolistId, removeTodolist }: PropsType) => {

  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId])

  const changeFilterTasksHandler = (filter: FilterValueType) => {
    changeFilter(todolistId, filter)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  }

  let tasksForToDoList = tasks;
  if (filter === "active") {
    tasksForToDoList = tasksForToDoList.filter(task => !task.isDone)
  }
  if (filter === "complited") {
    tasksForToDoList = tasksForToDoList.filter(task => task.isDone)
  }

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton title={"x"} onClick={removeTodolistHandler}><DeleteIcon /></IconButton>
      </div>
      <div>
        <AddItemForm addItem={ (title)=> {dispatch(addTaskAC(title, todolistId))} } />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForToDoList.map(task => {
            const removeTaskHandler = () => dispatch(removeTaskAC(task.id, todolistId))
            
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              dispatch(changeTaskStatusAC(task.id, newStatusValue, todolistId));
            }

            const changeTaskTitleHandler = (title: string) => {
              dispatch(changeTaskTitleAC(task.id, title, todolistId));
            }

            return (
              <ListItem
                key={task.id}
                sx={getListItemSx(task.isDone)}
              >
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={removeTaskHandler}><DeleteIcon /></IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterTasksHandler('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'complited' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterTasksHandler('complited')}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
}