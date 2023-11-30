import React, {useContext} from 'react'
import { ThemeContext } from '../hooks/ThemeProvider'
import { FaMoon } from "react-icons/fa6";
import { HiSun } from "react-icons/hi2";

export default function Header({lightBgDkt, darkBgDkt, lightBgMb, darkBgMb, toggleTheme,
  handleChange, inputValue, handleSendTodo}) {
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
    <header className={`h-auto w-full fixed top-0 left-0 right-0 overflow-hidden`}>
      <section className='fixed -z-2 top-9 right-0 left-0 pt-2 py-8 px-4'>
      <div className={`flex items-center text-4xl text-lightTheme-very-light-gray`}>
        <h1 className='font-bold  tracking-widest 
          '>TODO</h1>
        <div className='ml-auto rotate-[345deg]' onClick={toggleTheme}>
          {icon}
        </div>
      </div>
      <div className='mt-5 sm:h-[60px] relative'>
        <div 
          onClick={handleSendTodo}
          className={`absolute top-0 rounded-l-xl  ${switchTheme} h-full flex items-center justify-center
        w-16 -mr-4`}>
          <div className={`h-7 w-7 border-[2px] rounded-full sm:top-[13px] left-6 sm:left-4  ${switchThemeTwo}`}>
          </div>
        </div>
        <input 
          name='text' 
          type="text"
          placeholder='Create a new todo...' 
          onChange={handleChange}
          value={inputValue}
          className={`rounded-xl active:bg-none focus:bg-none sm:pl-[4rem] ${switchTheme} w-full text-lg outline-none border-none sm:h-full sm:pt-1 `}
        />
      </div>
      </section>
      <section>
        {theme === "light" 
          ? (
            <section>
              <img className={lightBg} src={lightBgDkt} alt="bg-light" />
              <img className={lightMbBg} src={lightBgMb} alt="bg-light" />
            </section>
          ) : (
            <section>
              <img className={lightBg} src={darkBgDkt} alt="bg-dark"/>
              <img className={lightMbBg} src={darkBgMb} alt="bg-dark"/>
            </section>
          )}
      </section>
    </header>
  )
}