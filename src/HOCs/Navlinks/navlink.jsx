import { NavLink } from "react-router-dom";
import "./navlink.css";
import { ThemeContext } from "../ThemeContext/themeContext";
import { useContext } from "react";

const NavlinkComponent = (props) => {
  const { isDark } = useContext(ThemeContext);
  const { toPath, name, icon } = props;
  return (
    <NavLink
      to={toPath}
      className={({ isActive }) =>
        isActive
          ? isDark
            ? "darkActive-link active-link link darklink"
            : "active-link link"
          : isDark
          ? "link darklink"
          : "link"
      }
    >
      <div className="internal">
        <div className="icon">{icon}</div>

        <p>{name}</p>
      </div>
    </NavLink>
  );
};
export default NavlinkComponent;
