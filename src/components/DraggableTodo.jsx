import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxCross1 } from 'react-icons/rx';

const DraggableTodo = ({
  id, index, handleTodoClick,
  handleDeleteTodo, switchTheme, switchThemeTwo,
  checkColor, isChecked, value,
  iconChecked, isNew , hoverTheme
  }) => {
  const isFirstItem = index === 0;
 

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          
        >
          <div 
            className={`w-full sm:p-5 sm:px-5 md:p-7 lg:cursor-pointer 
            border-b-[1.5px] sm:space-y-2 md:space-y-3 lg:space-y-2 lg:py-4 flex 
            items-center sm:gap-3 md:gap-8 
            ${switchTheme} 
            ${isNew ? "animate-myAnim" : ""} 
            ${isFirstItem ? "first:rounded-t-md" : ""}`}
          >
            <div onClick={() => handleTodoClick(id)} className='flex items-center sm:gap-3 w-full md:gap-6'>
              <div>
                {isChecked ? (
                  <div className={`sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-8 lg:w-8 rounded-full flex bg-gradient-to-r from-primary-firstColor to-primary-secondColor transition-all xl:w-7 xl:h-7`}>
                    <img className='m-auto sm:w-4 md:w-6 lg:w-4 ' src={iconChecked} alt="icon-checked" />
                  </div>
                ) : (
                  <div className={`lg:hover:relative sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-8 lg:w-8 
                  border-[2px] rounded-full xl:w-7 xl:h-7 ${hoverTheme}
                  lg:hover:after:absolute lg:hover:after:content-[""] 
                  lg:hover:after:h-6 lg:hover:after:inset-[2px] 
                  lg:hover:after:w-6 lg:hover:after:rounded-full  
                  lg:hover:bg-gradient-to-r from-primary-firstColor to-primary-secondColor lg:hover:border-none ${switchThemeTwo}`}></div>
                )}
              </div>
              <ul className=''>
                <li className={`${isChecked && `line-through ${checkColor}`} 
                  sm:text-lg md:text-3xl lg:text-lg mt-1 sm:font-medium lg:font-normal
                   
                  `}>
                  {value}
                </li>
              </ul>
            </div>
            <div onClick={() => handleDeleteTodo(id)} className={`${switchThemeTwo} ml-auto sm:text-2xl md:text-4xl lg:text-2xl`}>
              <RxCross1 />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTodo;
