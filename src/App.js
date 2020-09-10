import React, {useState, useEffect} from 'react';
import './App.css';

// components
import Form from './components/Form';
import ToDoList from './components/TodoList';

function App() {
  // state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState("all");

  // use effect
  // run once when app loads
  useEffect(
    () => {getLocalTodos()},
    []
  );
  // Any time todos state or status state changes, run the function filterHandler to update filteredTodos state
  useEffect(
    () => {
      filterHandler();
      saveLocalTodos();
    }, 
    [todos, status]
  );
  
  // handlers
  const filterHandler = () => {
    switch (status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  // local storage operations
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos)
    }
    }
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    }
  
  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <Form 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText}
        setStatus={setStatus}/>
      <ToDoList 
        todos={todos} 
        setTodos={setTodos}
        filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
