import './App.css';
import { TaskType, ToDoList } from './components/ToDoList';


function App() {
  const tasks1: Array<TaskType> = [
    {id:1, title: 'HTML&CSS', isDone: true},
    {id:2, title: 'JS', isDone: true},
    {id:3, title: 'ReactJS', isDone: false},
    {id:4, title: 'Redux', isDone: false},
    {id:5, title: 'TS', isDone: false},
    {id:6, title: 'RTK qerry', isDone: false},
  ]

  const tasks2: Array<TaskType> = []

  return (
    <div className='App'>
      <div>
        <ToDoList title='What to learn' tasks={tasks1} />
      </div>
      <div>
        <ToDoList title='Empty'tasks={tasks2}/>
      </div>
    </div>
  );
}

export default App;