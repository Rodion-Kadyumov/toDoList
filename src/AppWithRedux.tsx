import './App.css';
import { AddItemForm } from './components/04 - Todolist for students/AddItemForm';
import { TaskType, ToDoList } from './components/04 - Todolist for students/ToDoList';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import { MenuButton } from './components/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './model/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './model/store';

export type FilterValueType = "all" | "active" | "complited"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {

  const [themeMode, setThemeMode] = useState("light") // Светлая и темная темы

  const theme = createTheme({ // Позволяет создавать глобальные стили
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  })

  const changeModeHandler = () => { // Светлая и темная темы
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodoListType[]>(state => state.toDoLists)

  const changeFilter = (todolistId: string, filter: FilterValueType, ) => {
    dispatch(changeTodolistFilterAC(todolistId, filter));
  }

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }

  const changeTodolistTitle = (taskId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(taskId, newTitle));
  }

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action)
  }

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{mb: "30px"}}>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={"default"} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>

        <Grid container sx={{mb: "30px"}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
          {todolists.map(tl => {

          return (
            <Grid>
              <Paper elevation={3} sx={{ p: '0 20px 20px 20px' }}>
                <ToDoList
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  changeFilter={changeFilter}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default AppWithRedux;