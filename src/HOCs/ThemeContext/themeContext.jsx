import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isDark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setDark(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
