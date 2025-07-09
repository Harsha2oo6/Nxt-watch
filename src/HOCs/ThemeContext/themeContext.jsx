import { createContext } from "react";
import { useState } from "react";

export const ThemeContext=createContext();
const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState("light");
    const [isDark,setDark]=useState(false);
    const toggleTheme=()=>{
        setTheme(prev=>(prev==='light'?'dark':'light'))
        setDark(prev=>(!prev))
    }
    

    return (
        <ThemeContext.Provider value={{theme,toggleTheme,isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;