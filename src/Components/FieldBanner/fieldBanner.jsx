import { useContext } from "react";

import "./fieldBanner.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";

const FieldBanner = (props) => {
  const { isDark } = useContext(ThemeContext);
  const { name, icon } = props;

  return (
    <div className={isDark ? "darkFieldCard fieldCard" : "fieldCard"}>
      <div className="fieldBanner">
        <div className={isDark ? "darkFieldIcon fieldIcon" : "fieldIcon"}>
          {icon}
        </div>
        <h1 className={isDark ? "darkFieldName fieldname" : "fieldName"}>
          {name}
        </h1>
      </div>
    </div>
  );
};

export default FieldBanner;
