import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./gamingView.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";

const GamingView = (props) => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const { id, thumbnail_url, title, view_count } = props.details;

  return (
    <div className="gamingElement" onClick={() => navigate(`/videos/${id}`)}>
      <img src={thumbnail_url} className="gamingThumbnail" alt="game" />
      <div className="gamingTexts">
        <h4 className={isDark ? "darkTitle" : ""}>{title}</h4>
        <p className={isDark ? "gamingName" : ""}>
          {view_count} Watching Worldwide
        </p>
      </div>
    </div>
  );
};

export default GamingView;
