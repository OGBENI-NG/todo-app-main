import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxCross1 } from 'react-icons/rx';

const DraggableTodo = ({
    id, index, handleTodoClick,
    handleDeleteTodo, switchTheme, switchThemeTwo,
    checkColor, isChecked, value,
    iconChecked, isNew 
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
          <ul className={`w-full sm:p-5 sm:px-5 border-b-[1.5px] space-y-2 flex items-center gap-3 ${switchTheme} ${isNew ? "animate-myAnim" : ""} ${isFirstItem ? "first:rounded-t-lg" : ""}`}>
            <li onClick={() => handleTodoClick(id)} className='flex items-center gap-3 w-full'>
              <li>
                {isChecked ? (
                  <li className={`h-7 w-7 rounded-full flex bg-gradient-to-r from-primary-firstColor to-primary-secondColor`}>
                    <img className='m-auto w-4' src={iconChecked} alt="icon-checked" />
                  </li>
                ) : (
                  <li className={`h-7 w-7 border-[2px] rounded-full ${switchThemeTwo}`}></li>
                )}
              </li>
              <li className={`${isChecked && `line-through ${checkColor}`} text-lg mt-1 font-medium`}>
                {value}
              </li>
            </li>
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
