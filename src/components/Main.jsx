import React from 'react'
import { RxCross1 } from "react-icons/rx";

export default function Main(
  {theme, iconChecked, handleDeleteTodo, filter, setFilter, filteredTodos,
    todoList, handleTodoClick, itemsLeftCount, deleteCheckedTodos}
  ) {
    
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
    <main className='sm:px-4 h-screen'>
      <section className='flex items-center mt-[9.8rem] justify-center w-full '>
        <section className='sm:py-7 w-full '>
          <section className='w-full m-auto '>
            <div className='relative h-auto'>
              {filteredTodos().map((todo) => (
                <ul 
                  key={todo.id} 
                  className={`first:rounded-t-xl w-full
                  sm:p-5 sm:px-5 border-b-[1.5px] 
                  space-y-2 flex items-center gap-3 ${switchTheme}
                  
                `}>
                  <div 
                    onClick={() => handleTodoClick(todo.id)}
                    className='flex items-center gap-3 w-full'
                  >
                    <div>
                      {todo.isChecked 
                        ? (<div className={`h-7 w-7 rounded-full flex bg-gradient-to-r from-primary-firstColor to-primary-secondColor`}>
                          <img className='m-auto w-4' src={iconChecked} alt="icon-checked" />
                        </div>)
                        : (<div className={`h-7 w-7 border-[2px] rounded-full ${switchThemeTwo}`}></div>)
                      }
                    </div>
                    <li className={`${todo.isChecked && `line-through ${checkColor}`} 
                    text-lg mt-1 font-medium`}>
                      {todo.value}
                    </li>
                  </div>
                  <li 
                    onClick={() => handleDeleteTodo(todo.id)}
                    className={`${switchThemeTwo} ml-auto text-2xl`}
                  >
                    <RxCross1  />
                  </li>
                </ul>     
              ))}
              {todoList.length > 0 && (
                <ul className={`${switchThemeThree} flex items-center sm:py-5 sm:px-6 text-lg font-medium rounded-b-xl`}>
                  <li>{itemsLeftCount} item{itemsLeftCount !== 1 ? 's' : ''} left</li>
                  <li onClick={deleteCheckedTodos} className='ml-auto'>clear completed</li>
                </ul>
              )}
            </div>
          </section>
        </section>
      </section>
     <section className='relative z-1'>
      {todoList.length > 0 &&
        <div className={`${switchThemeThree} font-bold text-xl sm:mb-6 flex 
        justify-center gap-8 py-5 rounded-xl`}>
          <span onClick={() => setFilter('All')}
          className={filter === 'All' ? 'text-primary-bright-blue' : ''}>All</span>
          <span onClick={() => setFilter('Active')}
          className={filter === 'Active' ? 'text-primary-bright-blue' : ''}>Active</span>
          <span onClick={() => setFilter('Completed')}
          className={filter === 'Completed' ? 'text-primary-bright-blue' : ''}>Completed</span>
        </div>
      }
      <p className={`${switchThemeThree} bg-transparent text-center text-lg mt-12`}>
        Drag and drop to reorder list
      </p>
     </section>
    </main>
  )
}
