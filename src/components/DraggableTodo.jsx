import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxCross1 } from 'react-icons/rx';

const DraggableTodo = ({ id, index, handleTodoClick, handleDeleteTodo, switchTheme, switchThemeTwo, checkColor, isChecked, value, iconChecked }) => {
  const isFirstItem = index === 0;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ul className={`w-full sm:p-5 sm:px-5 border-b-[1.5px] space-y-2 flex items-center gap-3 ${switchTheme} ${isFirstItem && "animate-myAnim"} ${isFirstItem ? "first:rounded-t-lg" : ""}`}>
            <div onClick={() => handleTodoClick(id)} className='flex items-center gap-3 w-full'>
              <div>
                {isChecked ? (
                  <div className={`h-7 w-7 rounded-full flex bg-gradient-to-r from-primary-firstColor to-primary-secondColor`}>
                    <img className='m-auto w-4' src={iconChecked} alt="icon-checked" />
                  </div>
                ) : (
                  <div className={`h-7 w-7 border-[2px] rounded-full ${switchThemeTwo}`}></div>
                )}
              </div>
              <li className={`${isChecked && `line-through ${checkColor}`} text-lg mt-1 font-medium`}>
                {value}
              </li>
            </div>
            <li onClick={() => handleDeleteTodo(id)} className={`${switchThemeTwo} ml-auto text-2xl`}>
              <RxCross1 />
            </li>
          </ul>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTodo;
