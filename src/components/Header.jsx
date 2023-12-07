import React, {useContext} from 'react'
import { ThemeContext } from '../hooks/ThemeProvider'
import { FaMoon } from "react-icons/fa6";
import { HiSun } from "react-icons/hi2";

export default function Header({lightBgDkt, darkBgDkt, lightBgMb,
  darkBgMb, toggleTheme, onChange,
  inputValue, handleSendTodo, onKeyPress
  }) {
  const {theme} = useContext(ThemeContext)
  const lightBg = 'sm:hidden md:block w-full h-full'
  const lightMbBg = 'sm:block md:hidden w-full h-full'
  const icon = theme === "light" ? <FaMoon/> : <HiSun/>

  const switchTheme = theme === "light" 
    ? "bg-lightTheme-very-light-gray text-lightTheme-very-dark-grayish-blue border-lightTheme-light-grayish-blue" 
    : "bg-darkTheme-very-dark-desaturated-blue text-lightTheme-very-light-grayish-blue border-darkTheme-very-dark-grayish-blue-2"
  ;
  const switchThemeTwo = theme === "light"
    ? "border-lightTheme-dark-grayish-blue" 
    : "border-darkTheme-very-dark-grayish-blue-1"
  ;

  return (
    <header className={`h-full w-full absolute top-0 left-0 right-0 overflow-hidden`}>
      <section className='absolute z-[0] top-9 right-0 left-0 sm:pt-2 sm:pb-8 sm:px-4
        md:py-6 md:px-8 lg:py-12 lg:max-w-[580px] lg:m-auto xl:max-w-[600px] xl:top-5'
      >
        <div className={`flex items-center sm:text-4xl md:text-6xl  text-lightTheme-very-light-gray lg:text-5xl lg:pb-4`}>
          <h1 className='font-bold  tracking-widest'>TODO</h1>
          <div className='ml-auto rotate-[345deg] lg:cursor-pointer' onClick={toggleTheme}>
            {icon}
          </div>
        </div>
        <div className='sm:mt-5 lg:cursor-pointer md:mt-9 lg:mt-10 md:h-[90px] sm:h-[60px] lg:h-[70px] xl:h-[65px] xl:mt-4 relative'>
          <div 
            onClick={handleSendTodo}
            className={`absolute top-0 rounded-l-md  ${switchTheme} h-full flex 
            items-center justify-center sm:w-16 md:w-24 lg:w-20 -mr-4`}>
            <div className={`sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-8 lg:w-8 border-[2px] rounded-full sm:top-[13px] sm:left-4 xl:w-7 xl:h-7 
             ${switchThemeTwo}`}>
            </div>
          </div>
          <input 
            name='text' 
            type="text"
            placeholder='Create a new todo...' 
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={inputValue}
            className={`rounded-md active:bg-none focus:bg-none sm:pl-[4rem] 
            ${switchTheme} md:pl-[6rem] 
            w-full sm:text-lg md:text-4xl lg:text-2xl xl:text-lg outline-none border-none sm:h-full sm:pt-1 xl
            lg:pl-[5rem] focus:outline-none active:border-none focus:border-none`}
          />
        </div>
      </section>
      <section className=''>
        {theme === "light" 
          ? (
            <section className={`sm:h-[220px] md:h-[300px] lg:h-[320px] xl:h-[270px]`}>
              <img className={lightBg} src={lightBgDkt} alt="bg-light" />
              <img className={lightMbBg} src={lightBgMb} alt="bg-light" />
            </section>
          ) : (
            <section className={`sm:h-[220px] md:h-[300px] lg:h-[320px] xl:h-[270px]`}>
              <img className={lightBg} src={darkBgDkt} alt="bg-dark"/>
              <img className={lightMbBg} src={darkBgMb} alt="bg-dark"/>
            </section>
        )}
      </section>
    </header>
  )
}
