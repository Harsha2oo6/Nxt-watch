import { useContext } from "react";
import "./gamingView.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";

const GamingView = (props) => {
    const {isDark}=useContext(ThemeContext)
  const { id, thumbnail_url, title, view_count } = props.details;
  return (
    <div className="gamingElement">
      <img src={thumbnail_url} className="gamingThumbnail" alt="game" />
      <div className="gamingTexts">
        <h4 className={isDark?"darkTitle":""}>{title}</h4>
        <p className={isDark?"gamingName":""}>{view_count} Watching Worldwide</p>
      </div>
    </div>
  );
};
export default GamingView;
