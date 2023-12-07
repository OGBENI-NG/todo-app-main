import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTodo from './DraggableTodo';

export default function Main({ theme, iconChecked, handleDeleteTodo,
  filter, setFilter, todoList, handleTodoClick, completedCount,
  itemsLeftCount, deleteCheckedTodos, handleTodoMove, filteredTodos,
  }) {

  const isNewTodo = (timestamp) => {
    const currentTime = Date.now();
    const isNewThreshold = 1000; // Consider todos as new if created within the last minute
    return currentTime - timestamp < isNewThreshold;
  };

  const renderTodoCount = () => {
    // Determine the count type and count text based on the filter
    let countType, countText;
    if (filter === "All") {
      countType = "itemsLeft";
      countText = "left";
    } else if (filter === "Completed") {
      countType = "completed";
      countText = "completed";
    } else if (filter === "Active") {
      countType = "itemsLeft";
      countText = "active";
    }
  
    // Calculate the count based on the type
    const count = countType === "itemsLeft" 
      ? itemsLeftCount 
      : completedCount
    ;
  
    // Adjust the count text based on the filter
    const adjustedCountText = filter === "Completed" || filter === "Active"
      ? countText 
      : count > 1 ? countText + 's' : countText
    ;
  
    return (
      <div>
        {/* Render the count with adjusted count text */}
        <span>{count} {adjustedCountText}</span>
      </div>
    );
  };
  

  const switchTheme = theme === "light" 
    ? "bg-lightTheme-very-light-gray text-lightTheme-very-dark-grayish-blue border-lightTheme-light-grayish-blue " 
    : "bg-darkTheme-very-dark-desaturated-blue text-lightTheme-very-light-grayish-blue border-darkTheme-very-dark-grayish-blue-2 lg:hover:text-darkTheme-light-grayish-blue-hover"
  ;
  const hoverTheme = theme === "light" 
    ? "lg:hover:after:bg-lightTheme-very-light-gray"
    : "lg:hover:after:bg-darkTheme-very-dark-desaturated-blue"
  ;

  const hoverColor = theme === "light"
    ? "lg:hover:text-lightTheme-very-dark-grayish-blue"
    : "lg:hover:text-lightTheme-very-light-grayish-blue "
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
    <main className='sm:px-4 md:px-8 lg:max-w-[550px] xl:max-w-[575px] lg:m-auto'>
      <section className='flex items-center sm:mt-[9.8rem] md:mt-[15rem] 
       justify-center w-full lg:mt-[16rem] xl:mt-[13rem]'>
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
                        isNew={isNewTodo(todo.timestamp)}
                        hoverTheme={hoverTheme}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div>
              {todoList.length > 0 && (
                <div className={`${switchThemeThree} flex items-center sm:py-5 sm:px-6 sm:text-lg md:text-3xl md:p-8 font-medium rounded-b-md lg:text-xl
                lg:py-4`}>
                  {renderTodoCount()}
                  <span onClick={deleteCheckedTodos} className='ml-auto lg:cursor-pointer'>clear completed</span>
                </div>
              )}
            </div>
          </section>
        </section>
      </section>
     <section className='relative z-1 h-auto sm:py-2 '>
      {todoList.length > 0 &&
        <div className={`${switchThemeThree} font-bold sm:text-xl flex lg:cursor-pointer
        justify-center sm:gap-7 md:gap-10 sm:py-5 md:text-3xl md:p-8 rounded-md 
        lg:text-xl lg:py-4`}>
          <span 
            onClick={() => setFilter('All')}
            className={`${hoverColor} ${filter === 'All' ? 'text-primary-bright-blue' : ''}`}
          >All</span>
          <span 
            onClick={() => setFilter('Active')}
            className={`${hoverColor} ${filter === 'Active' ? 'text-yellow-500' : ''}`}
          >Active</span>
          <span 
            onClick={() => setFilter('Completed')}
            className={`${hoverColor} ${filter === 'Completed' ? 'text-green-500' : ''}`}
          >Completed</span>
        </div>
      }
      <p className={`${switchThemeThree} 
        bg-transparent text-center sm:text-lg pt-8 pb-12
        md:text-2xl`}
      >
        {!todoList.length ? 'NO TODO' : 'Drag and drop to reorder list'}
      </p>
     </section>
    </main>
  )
}
