import React,{useContext, useState, useEffect} from 'react'
import Header from './Header'
import lightBgDkt from "../asset/images/bg-desktop-light.jpg"
import darkBgDkt from "../asset/images/bg-desktop-dark.jpg"
import lightBgMb from "../asset/images/bg-mobile-light.jpg"
import darkBgMb from "../asset/images/bg-mobile-dark.jpg"
import iconChecked from "../asset/images/icon-check.svg"
import { ThemeContext } from '../hooks/ThemeProvider'
import Main from './Main'
import { pushInputValueToFirebase, fetchTodoListFromFirebase, 
  ref, update, database, removeTodoFromFirebase } from '../utility/firebase';

export default function App() {
  const {theme, toggleTheme} = useContext(ThemeContext)
  const [inputValue, setInputValue] = useState("")
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('All');
  
  //switch theme variable
  const switchTheme = theme === "light" 
    ? "bg-lightTheme-very-light-grayish-blue " 
    : "bg-darkTheme-very-dark-blue"
  ;

  // Function to filter todos based on the selected filter (All, Active, Completed)
  const filteredTodos = () => {
    switch (filter) {
      case 'Active':
        return todoList.filter(todo => !todo.isChecked);
      case 'Completed':
        return todoList.filter(todo => todo.isChecked);
      default:
        return todoList;
    }
  };

  // Function to count the number of active todos
  const itemsLeftCount = filteredTodos().filter(todo => !todo.isChecked).length;
  const completedCount = filteredTodos().filter(todo => todo.isChecked).length
  

  // Effect hook to fetch todo list from Firebase and update the component state
  useEffect(() => {
    // Example fetchTodoListFromFirebase function from your setup
    fetchTodoListFromFirebase((todos) => setTodoList(todos));
  }, [])

  // Function to delete a todo by its ID
  const handleDeleteTodo = (todoId) => {
    removeTodoFromFirebase(todoId);
    // Optionally, update your component state to reflect the removal
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));
  };

  // Function to handle todo item click, updating its isChecked property
  const handleTodoClick = (clickedTodoId) => {
    const todoRef = ref(database, 'todo-main');

    // Retrieve the specific todo by its ID
    const todoToUpdate = todoList.find((todo) => todo.id === clickedTodoId);

    // Update the isChecked property
    if (todoToUpdate) {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === clickedTodoId ? { ...todo, isChecked: !todo.isChecked } : todo
      );

      // Update the Firebase database with the new isChecked value
      const updates = {};
      updates[clickedTodoId + '/isChecked'] = !todoToUpdate.isChecked;
      update(todoRef, updates);

      // Update the component state with the modified todo list
      setTodoList(updatedTodoList);
    }
  };

  // Function to handle input change event, updating the inputValue state
  function handleChange(e) {
    const value = e.target.value;
    const newValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    setInputValue(newValue);
  }

  // Function to handle sending a new todo to Firebase
  const handleSendTodo = () => {
    if (inputValue.trim() !== '') {
      const timestamp = Date.now(); // Use a timestamp as a position
      pushInputValueToFirebase(inputValue, timestamp);
      setInputValue('');
      setFilter("All");
    }
  };

  // Function to delete all checked todos
  const deleteCheckedTodos = () => {
    const todoRef = ref(database, 'todo-main');
    // Filter out the checked todos
    const todosToDelete = todoList.filter((todo) => todo.isChecked);
    // Create an object to store updates for each checked todo
    const updates = {};
    // Delete each checked todo
    todosToDelete.forEach((todo) => {
      updates[todo.id] = null; // Set to null to delete the todo
    });

    // Apply the updates to Firebase
    update(todoRef, updates);

    // Optionally, update your component state to reflect the removal
    setTodoList((prevTodo) => prevTodo.filter((todo) => !todo.isChecked));
  };

  // Function to handle todo drag and drop
  const handleTodoMove = (result) => {
    if (!result.destination) return;

    const updatedTodoList = Array.from(todoList);
    const [movedTodo] = updatedTodoList.splice(result.source.index, 1);
    updatedTodoList.splice(result.destination.index, 0, movedTodo);

    // Update the positions in the state
    setTodoList(updatedTodoList);

    // Update the Firebase database with the new order and positions
    const todoRef = ref(database, 'todo-main');
    const updates = {};

    // Update each todo's position in the database
    updatedTodoList.forEach((todo, index) => {
      updates[todo.id + '/position'] = index;
    });

    update(todoRef, updates);
  };

  return (
    <main className={`font-Josefin scroll-smooth ${switchTheme} ${!todoList.length && "h-screen overflow-hidden"} `}
    >
      <section className={ `relative z-0 overflow-x-hidden h-screen`}>
        <Header
          lightBgDkt={lightBgDkt}
          lightBgMb={lightBgMb}
          darkBgDkt={darkBgDkt}
          darkBgMb={darkBgMb}
          toggleTheme={toggleTheme}
          inputValue={inputValue}
          handleSendTodo={handleSendTodo}
          handleChange={handleChange}
        />
        <Main
          theme={theme}
          toggleTheme={toggleTheme}
          todoList={todoList}
          handleTodoClick={handleTodoClick}
          itemsLeftCount={itemsLeftCount}
          completedCount={completedCount}
          iconChecked={iconChecked}
          handleDeleteTodo={handleDeleteTodo}
          deleteCheckedTodos={deleteCheckedTodos}
          setFilter={setFilter}
          filter={filter}
          filteredTodos={filteredTodos}
          setTodoList={setTodoList}
          handleTodoMove={handleTodoMove}
         
        />
        </section>
    </main>
  )
}
