import { useContext } from "react";


import { Lightmodeicon,Darkmodeicon } from "../../Common/Icons/icons";

import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import './themeToggler.css'
const ThemeTogler = () => {
    const {isDark,toggleTheme}=useContext(ThemeContext)
  return (
    <button
      className={isDark ? "darkTheme-button theme-button" : "theme-button"}
      onClick={toggleTheme}
    >
      {isDark ? Lightmodeicon : Darkmodeicon}
    </button>
  );
};
export default ThemeTogler;