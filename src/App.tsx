// import './App.css';
// import { AddItemForm } from './components/04 - Todolist for students/AddItemForm';
// import { TaskType, ToDoList } from './components/04 - Todolist for students/ToDoList';
// import { useState } from 'react';
// import { v1 } from 'uuid';
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
// import { Container, Paper } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'
// import { MenuButton } from './components/MenuButton';
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import Switch from '@mui/material/Switch'
// import CssBaseline from '@mui/material/CssBaseline'

// export type FilterValueType = "all" | "active" | "complited"

// export type TodoListType = {
//   id: string
//   title: string
//   filter: FilterValueType
// }

// export type TasksStateType = {
//   [key: string]: TaskType[]
// }

// type ThemeMode = 'dark' | 'light' // Светлая и темная темы

// function App() {

//   const [themeMode, setThemeMode] = useState("light") // Светлая и темная темы

//   const theme = createTheme({ // Позволяет создавать глобальные стили
//     palette: {
//       mode: themeMode === 'light' ? 'light' : 'dark',
//       primary: {
//         main: '#087EA4',
//       },
//     },
//   })

//   const changeModeHandler = () => { // Светлая и темная темы
//     setThemeMode(themeMode === 'light' ? 'dark' : 'light')
//   }

//   let todolistId1 = v1()
//   let todolistId2 = v1()

//   let [todolists, setTodolists] = useState<TodoListType[]>([
//     {id: todolistId1, title: "What to learn", filter: "all"},
//     {id: todolistId2, title: "What to buy", filter: "all"},
//   ])

//   let [tasks, setTasks] = useState<TasksStateType>({
//     [todolistId1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//     ],
//     [todolistId2]: [
//       { id: v1(), title: 'Rest API', isDone: true },
//       { id: v1(), title: 'GraphQL', isDone: false },
//     ],
//   })

//   const addTask = (title: string, todolistId: string) => {
//     let tas = {id: v1(), title: title, isDone: false};
//     let task = tasks[todolistId];
//     let newTask = [tas, ...task];
//     tasks[todolistId] = newTask
//     setTasks({ ...tasks })
//   }

//   const removeTask = (taskId: string, todolistId: string) => {
//     let task = tasks[todolistId];
//     let filteredTasks = task.filter(t => t.id !== taskId);
//     tasks[todolistId] = filteredTasks;
//     setTasks({ ...tasks})
// }

// const addTodolist = (title: string) => {
//   const todolistId = v1()
//   const newTodolist: TodoListType = { id: todolistId, title: title, filter: 'all' }
//   setTodolists([newTodolist, ...todolists])
//   setTasks({ ...tasks, [todolistId]: [] })
// }

// const removeTodolist = (todolistId: string) => {
//   const newTodolists = todolists.filter(tl => tl.id !== todolistId)
//   setTodolists(newTodolists)
//   // удалим таски для тудулиста из стейта где мы храним таски
//   delete tasks[todolistId]
//   // засетаем в state копию объекта
//   setTasks({ ...tasks })
// }

//   const changeFilter = (todolistId: string, filter: FilterValueType) => {
//     setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)))
//   }

//   const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
//     let task = tasks[todolistId];
//     let tas = task.find(t=> t.id === taskId);
//     if(tas) {
//       tas.isDone = isDone;
//       setTasks({ ...tasks})
//     }
//   }

//   const updateTask = (todolistId: string, taskId: string, title: string) => {
//     const newTodolistTasks = {
//       ...tasks,
//       [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
//     }
//     setTasks(newTodolistTasks)
//   }

//   const updateTodolist = (todolistId: string, title: string) => {
//     const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
//     setTodolists(newTodolists)
//   }

//   return(
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar position="static" sx={{mb: "30px"}}>
//         <Toolbar>
//           <IconButton color="inherit">
//             <MenuIcon />
//           </IconButton>
//           <div>
//             <MenuButton>Login</MenuButton>
//             <MenuButton>Logout</MenuButton>
//             <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
//             <Switch color={"default"} onChange={changeModeHandler} />
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Container fixed>

//         <Grid container sx={{mb: "30px"}}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>

//         <Grid container spacing={4}>
//           {todolists.map(tl => {

//           let tasksForToDoList = tasks[tl.id];
//           if (tl.filter === "active") {
//             tasksForToDoList = tasksForToDoList.filter(task => !task.isDone)
//           }
//           if (tl.filter === "complited") {
//             tasksForToDoList = tasksForToDoList.filter(task => task.isDone)
//           }

//           return (
//             <Grid>
//               <Paper elevation={3} sx={{ p: '0 20px 20px 20px' }}>
//                 <ToDoList
//                   key={tl.id}
//                   todolistId={tl.id}
//                   title={tl.title}
//                   tasks={tasksForToDoList}
//                   removeTask={removeTask}
//                   removeTodolist={removeTodolist}
//                   changeFilter={changeFilter}
//                   addTask={addTask}
//                   changeTaskStatus={changeStatus}
//                   filter={tl.filter}
//                   updateTask={updateTask}
//                   updateTodolist={updateTodolist}
//                 />
//               </Paper>
//             </Grid>
//           );
//           })}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   )
// }

// export default App;