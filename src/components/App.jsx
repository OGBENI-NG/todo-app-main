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
  const itemsLeftCount = todoList.filter((todo) => !todo.isChecked).length;
  
  const switchTheme = theme === "light" 
    ? "bg-lightTheme-very-light-grayish-blue " 
    : "bg-darkTheme-very-dark-blue"
  ;

  useEffect(() => {
    fetchTodoListFromFirebase((data) => {
      // Use unshift to add the new todo at the beginning of the array
      setTodoList(data);
    });

  }, []);

  //delete each todo one by one
  const handleDeleteTodo = (todoId) => {
    removeTodoFromFirebase(todoId);
    // Optionally, update your component state to reflect the removal
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));
  };

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
  
      setTodoList(updatedTodoList);
    }
  };
  
  function handleChange(e) {
    const value = e.target.value
    const newValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : ""
    setInputValue(newValue)
  }
  const handleSendTodo = () => {
    if (inputValue.trim() !== '') {
      pushInputValueToFirebase(inputValue);
      setInputValue('');
    }
  };

  return (
    <section className={`font-Josefin ${switchTheme} overflow-hidden`}
    >
      <section className='h-screen overflow-x-hidden'>
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
        iconChecked={iconChecked}
        handleDeleteTodo={handleDeleteTodo}
      />
      </section>
    </section>
  )
}
