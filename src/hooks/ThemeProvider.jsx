import React,{createContext, useState, useEffect} from 'react'
const ThemeContext = createContext()

export default function ThemeProvider({children}) {
  const [theme, setTheme] = useState(localStorageTheme)

  function localStorageTheme() {
    const storeTheme = localStorage.getItem("light");
    return storeTheme ? JSON.parse(storeTheme) : "light";
  }

  useEffect(() => {
    localStorage.setItem("light", JSON.stringify(theme));
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div>{children}</div>
    </ThemeContext.Provider>
  )
}

export {ThemeContext}