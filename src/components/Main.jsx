import React, {useState} from 'react'
import { RxCross1 } from "react-icons/rx";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTodo from './DraggableTodo';



export default function Main(
  { theme, iconChecked, handleDeleteTodo, filter, setFilter, todoList, handleTodoClick, itemsLeftCount, deleteCheckedTodos, setTodoList, filteredTodos }
  ) {

    const handleTodoMove = (result) => {
      if (!result.destination) return;
  
      const updatedTodoList = Array.from(todoList);
      const [movedTodo] = updatedTodoList.splice(result.source.index, 1);
      updatedTodoList.splice(result.destination.index, 0, movedTodo);
  
      setTodoList(updatedTodoList);
    };
  
  const switchTheme = theme === "light" 
    ? "bg-lightTheme-very-light-gray text-lightTheme-very-dark-grayish-blue border-lightTheme-light-grayish-blue" 
    : "bg-darkTheme-very-dark-desaturated-blue text-lightTheme-very-light-grayish-blue border-darkTheme-very-dark-grayish-blue-2"
  ;
  const switchThemeTwo = theme === "light"
    ? "border-lightTheme-dark-grayish-blue" 
    : "border-darkTheme-very-dark-grayish-blue-1"
  ;
  const switchThemeThree = theme === "light"
    ? "bg-lightTheme-very-light-gray text-lightTheme-dark-grayish-blue"
    : "bg-darkTheme-very-dark-desaturated-blue text-darkTheme-very-dark-grayish-blue-1"
  ;
  const checkColor = theme === "light"
    ? "text-lightTheme-light-grayish-blue"
    : "text-darkTheme-very-dark-grayish-blue-1"
  ;
  return (
    <main className='sm:px-4'>
      <section className='flex items-center mt-[9.8rem] justify-center w-full'>
        <section className='sm:py-7 w-full'>
          <section className='w-full m-auto relative transition-all'>
          <DragDropContext onDragEnd={handleTodoMove}>
              <Droppable droppableId="todoList" type="TODO">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {filteredTodos().map((todo, index) => (
                      <DraggableTodo
                        key={todo.id}
                        index={index}
                        id={todo.id}
                        handleTodoClick={handleTodoClick}
                        handleDeleteTodo={handleDeleteTodo}
                        switchTheme={switchTheme}
                        switchThemeTwo={switchThemeTwo}
                        checkColor={checkColor}
                        isChecked={todo.isChecked}
                        value={todo.value}
                        iconChecked={iconChecked}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {todoList.length > 0 && (
              <ul className={`${switchThemeThree} flex items-center sm:py-5 sm:px-6 text-lg font-medium rounded-b-xl`}>
                <li>{itemsLeftCount} item{itemsLeftCount !== 1 ? 's' : ''} left</li>
                <li onClick={deleteCheckedTodos} className='ml-auto'>clear completed</li>
              </ul>
            )}
            
          </section>
        </section>
      </section>
     <section className='relative z-1 h-auto sm:py-2'>
      {todoList.length > 0 &&
        <div className={`${switchThemeThree} font-bold text-xl flex 
        justify-center gap-8 py-5 rounded-xl`}>
          <span onClick={() => setFilter('All')}
          className={filter === 'All' ? 'text-primary-bright-blue' : ''}>All</span>
          <span onClick={() => setFilter('Active')}
          className={filter === 'Active' ? 'text-yellow-500' : ''}>Active</span>
          <span onClick={() => setFilter('Completed')}
          className={filter === 'Completed' ? 'text-green-500' : ''}>Completed</span>
        </div>
      }
      <p className={`${switchThemeThree} bg-transparent text-center text-lg pt-8 pb-12`}>
        {!todoList.length ? 'NO TODO' : 'Drag and drop to reorder list'}
      </p>
     </section>
    </main>
  )
}
